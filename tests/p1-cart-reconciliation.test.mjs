import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
const source=await fs.readFile(process.env.P1_PRODUCT_FORM_PATH||'theme/assets/product-form.js','utf8');
const es=JSON.parse(await fs.readFile('work/p1-candidate/theme/locales/es.json','utf8'));
function harness({cart={item_count:4,items:[{variant_id:7,quantity:3},{variant_id:8,quantity:1}]},section='<div class="shopify-section"><span>4</span></div>',sectionOk=true,fail=false,status=422,dialog=false}={}){
  const calls=[],messages=[],events=[],bubble={innerHTML:'OLD'};let Class,resolveDone;
  const done=new Promise(resolve=>resolveDone=resolve),cartUrl='/es/cart';
  const response=value=>({ok:true,json:async()=>value});
  const globals={HTMLElement:class{},customElements:{get:()=>undefined,define:(name,type)=>Class=type},
    routes:{cart_url:cartUrl,cart_add_url:cartUrl+'/add.js'},window:{cartStrings:{error:'Error',pocoCartQuantity:es.poco.cart.variant_quantity,pocoRefreshError:es.poco.cart.refresh_error},routes:{cart_url:cartUrl},location:{pathname:'/es/products/demo'}},
    document:{getElementById:id=>id==='cart-icon-bubble'?bubble:null,activeElement:{}},
    DOMParser:class{parseFromString(html){return{querySelector:()=>html.includes('class="shopify-section"')?{innerHTML:html.replace(/^<div[^>]*>/,'').replace(/<\/div>$/,'')}:null}}},
    FormData:class{constructor(form){this.data=new Map([['id','7'],['quantity','4']]);}get(k){return this.data.get(k)}append(k,v){this.data.set(k,v)}},
    fetchConfig:()=>({method:'POST',headers:{}}),PUB_SUB_EVENTS:{cartError:'error',cartUpdate:'update'},publish:(name,data)=>{events.push({name,data});return Promise.resolve()},
    CartPerformance:{createStartingMarker:()=>0,measureFromMarker:()=>{},measureFromEvent:()=>{},measure:(name,fn)=>fn()},console:{error:()=>{}},
    fetch:async(url,config={})=>{calls.push({url,method:config.method||'GET'});if(config.method==='POST')return response(status?{status,description:'SERVER STOCK MESSAGE'}:{id:7,key:'item',sections:{}});if(fail)throw Error('offline');if(/\.(js|json)$/.test(url))return response(cart);return{ok:sectionOk,json:async()=>({'cart-icon-bubble':section})}}};
  vm.runInNewContext(source,globals);
  const form=Object.create(Class.prototype);let rendered=0;
  Object.assign(form,{form:{},cart:dialog?{getSectionsToRender:()=>[{id:'cart-icon-bubble'}],setActiveElement:()=>{},renderContents:()=>rendered++,classList:{contains:()=>false}}:null,
    submitButton:{getAttribute:()=>null,setAttribute:()=>{},removeAttribute:()=>{},querySelector:()=>null,classList:{add:()=>{},remove:()=>{}}},
    querySelector:()=>({classList:{remove:()=>{},add:()=>resolveDone()}}),closest:()=>null,createCartLinesUpdateEvent:()=>null,handleErrorMessage:m=>{if(m)messages.push(m)},dispatchCartErrorEvent:()=>{}});
  return {form,globals,calls,messages,events,bubble,done,get rendered(){return rendered}};
}
const submit=async h=>{h.form.onSubmitHandler({preventDefault(){}});await h.done;};
test('422 reconciles actual cart and native header without retrying the add',{timeout:1500},async()=>{const h=harness();await submit(h);assert.equal(h.calls.filter(c=>c.method==='POST').length,1);assert.equal(h.calls.filter(c=>c.method==='GET').length,2);assert.match(h.calls[1].url,/^\/es\/cart\.(js|json)$/);assert.equal(h.calls[2].url,'/es/cart?sections=cart-icon-bubble');assert.equal(h.bubble.innerHTML,'<span>4</span>');assert.match(h.messages.at(-1),/3 unidades/);assert.ok(h.events.some(e=>e.name==='update'&&e.data.cartData.item_count===4));});
test('message states current variant quantity rather than claiming all were newly added',async()=>{const h=harness({cart:{item_count:3,items:[{variant_id:7,quantity:1},{variant_id:7,quantity:2}]}});await submit(h);assert.match(h.messages.at(-1),/Ahora tienes 3/);assert.doesNotMatch(h.messages.at(-1),/añadieron 3/);});
test('no available stock reports zero and uses server-rendered total',async()=>{const h=harness({cart:{item_count:1,items:[{variant_id:8,quantity:1}]},section:'<div class="shopify-section"><span>1</span></div>'});await submit(h);assert.match(h.messages.at(-1),/0 unidades/);assert.equal(h.bubble.innerHTML,'<span>1</span>');});
test('network failure retains server message and asks buyer to verify cart',async()=>{const h=harness({fail:true});await submit(h);assert.equal(h.bubble.innerHTML,'OLD');assert.match(h.messages.at(-1),/SERVER STOCK MESSAGE/);assert.match(h.messages.at(-1),/No pudimos confirmar/);});
test('missing section and HTTP failure do not invent a count',async()=>{for(const config of [{section:null},{sectionOk:false},{cart:{items:[],item_count:-1}},{cart:{items:[{variant_id:7,quantity:-1}],item_count:0}}]){const h=harness(config);await submit(h);assert.equal(h.bubble.innerHTML,'OLD');assert.match(h.messages.at(-1),/No pudimos confirmar/);}});
test('successful page add retains native redirect with no extra requests',async()=>{const h=harness({status:0});await submit(h);assert.equal(h.globals.window.location,'/es/cart');assert.equal(h.calls.length,1);});
test('non-422 errors retain native behavior',async()=>{const h=harness({status:404});await submit(h);assert.equal(h.calls.length,1);assert.equal(h.bubble.innerHTML,'OLD');});
test('native notification success and error are untouched by page-mode patch',async()=>{const good=harness({status:0,dialog:true});await submit(good);assert.equal(good.rendered,1);assert.equal(good.calls.length,1);const bad=harness({dialog:true});await submit(bad);assert.equal(bad.calls.length,1);assert.equal(bad.rendered,0);});
console.log('Local VM tests execute candidate ProductForm with mocked network/DOM, not Shopify runtime.');
test('cached layout without new translations still refreshes server count safely',async()=>{const h=harness();delete h.globals.window.cartStrings.pocoCartQuantity;delete h.globals.window.cartStrings.pocoRefreshError;await submit(h);assert.equal(h.bubble.innerHTML,'<span>4</span>');assert.doesNotMatch(h.messages.at(-1),/undefined/);});
