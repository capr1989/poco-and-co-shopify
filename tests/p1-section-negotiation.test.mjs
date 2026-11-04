import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
const original=await fs.readFile('theme/assets/product-form.js','utf8');
const candidate=await fs.readFile('work/p1-section-accept-candidate.js','utf8');
// Response negotiation follows the warning in unchanged Dawn standard-actions-override.js.
// These are local server-contract simulations, not a real Shopify 4/3 run.
async function reconcile(source,{total=4,variant=3,section=null,badCart=false,networkFailure=false}={}){
 let Class;const events=[],messages=[],requests=[],exceptions=[];const bubble={innerHTML:'OLD'};
 const context={Error:class extends Error{constructor(message){super(message);exceptions.push(message)}},HTMLElement:class{},customElements:{get:()=>undefined,define:(_,c)=>Class=c},routes:{cart_url:'/es/cart'},window:{cartStrings:{pocoCartQuantity:'Cantidad actual: [quantity]',pocoRefreshError:'Revisar carrito',error:'Error'}},document:{getElementById:()=>bubble},
 DOMParser:class{parseFromString(html){return{querySelector:()=>html.includes('class="shopify-section"')?{innerHTML:html.replace(/^<div[^>]*>/,'').replace(/<\/div>$/,'')}:null}}},PUB_SUB_EVENTS:{cartUpdate:'cart-update'},publish:(name,data)=>{events.push({name,data});return Promise.resolve()},
 fetch:async(url,options={})=>{requests.push({url,accept:options.headers?.Accept,method:options.method||'GET'});if(networkFailure)throw TypeError('network unavailable');const cart={item_count:badCart?-1:total,items:[{variant_id:7,quantity:variant}]};const isCart=url.endsWith('cart.js');const data=isCart||options.headers?.Accept==='application/json'?cart:{'cart-icon-bubble':section??'<div class="shopify-section"><span>'+total+'</span></div>'};return new Response(JSON.stringify(data),{status:200,headers:{'Content-Type':isCart?'text/javascript; charset=utf-8':'application/json; charset=utf-8'}})}};
 vm.runInNewContext(source,context);const form=Object.create(Class.prototype);form.handleErrorMessage=m=>messages.push(m);await form.reconcilePageCartError('7','Stock limitado');return{events,messages,requests,bubble,exceptions};
}
test('deployed header reproduces valid JSON with missing section and stale bubble',async()=>{const r=await reconcile(original);assert.equal(r.bubble.innerHTML,'OLD');assert.equal(r.events.length,0);assert.deepEqual(r.exceptions,['Incomplete cart refresh']);assert.match(r.messages.at(-1),/Revisar carrito/);assert.equal(r.requests[1].accept,'application/json');});
for(const [total,variant] of [[4,3],[3,3],[1,0]])test('candidate reconciles server total '+total+' and variant '+variant,async()=>{const r=await reconcile(candidate,{total,variant});assert.equal(r.requests[0].url,'/es/cart.js');assert.equal(r.requests[0].accept,'application/json');assert.equal(r.requests[1].accept,undefined);assert.equal(r.bubble.innerHTML,'<span>'+total+'</span>');assert.match(r.messages.at(-1),new RegExp('actual: '+variant));assert.equal(r.events.length,1);assert.equal(r.events[0].data.cartData.item_count,total);assert.ok(r.requests.every(x=>x.method==='GET'));});
test('invalid section leaves existing UI unchanged',async()=>{const r=await reconcile(candidate,{section:'invalid section'});assert.equal(r.bubble.innerHTML,'OLD');assert.equal(r.events.length,0);assert.match(r.messages.at(-1),/Revisar carrito/);});
test('invalid cart leaves existing UI unchanged',async()=>{const r=await reconcile(candidate,{badCart:true});assert.equal(r.bubble.innerHTML,'OLD');assert.equal(r.events.length,0);});
test('network failure retains safe recovery',async()=>{const r=await reconcile(candidate,{networkFailure:true});assert.equal(r.bubble.innerHTML,'OLD');assert.match(r.messages.at(-1),/Revisar carrito/);});
