import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
const source=await fs.readFile('work/p1-readonly-diagnostic.local.js','utf8');
const observedHTML=await fs.readFile('work/p1-observed-section.html','utf8');
async function run(failAt){
 let Class;const calls=[],logs=[],messages=[];let rendered='OLD';
 const bubble={get innerHTML(){return rendered},set innerHTML(v){if(failAt==='render')throw Error('injected render failure');rendered=v}};
 const cart={item_count:1,items:[{variant_id:7,quantity:1}]};
 const context={HTMLElement:class{},customElements:{get:()=>undefined,define:(_,c)=>Class=c},routes:{cart_url:'/es/cart'},window:{cartStrings:{pocoCartQuantity:'Carrito actualizado [quantity]',pocoRefreshError:'Revisar carrito',error:'Error'}},document:{getElementById:()=>bubble},
 DOMParser:class{parseFromString(html){if(failAt==='section')throw Error('injected parser failure');return{querySelector:()=>html?.includes('class="shopify-section"')?{innerHTML:'SERVER_HTML'}:null}}},
 PUB_SUB_EVENTS:{cartUpdate:'cart-update'},publish:()=>{if(failAt==='publish')throw Error('injected subscriber failure');return Promise.resolve()},
 console:{info:(tag,value)=>logs.push({tag,...value}),warn:(tag,value)=>logs.push({tag,...value})},
 fetch:async url=>{calls.push(url);if(failAt==='request')throw TypeError('injected network failure');const isCart=url.endsWith('.js');return new Response(isCart?(failAt==='parse'?'invalid json':JSON.stringify(cart)):JSON.stringify({'cart-icon-bubble':failAt==='validate'?null:observedHTML}),{status:200,headers:{'Content-Type':isCart?'text/javascript; charset=utf-8':'application/json; charset=utf-8'}})}};
 vm.runInNewContext(source,context);const form=Object.create(Class.prototype);form.handleErrorMessage=m=>messages.push(m);await form.reconcilePageCartError('7','Stock limitado');return{calls,logs,messages,rendered};
}
test('official cart.js with text/javascript MIME still parses as JSON',async()=>{const r=await run();assert.deepEqual(r.calls,['/es/cart.js','/es/cart?sections=cart-icon-bubble']);assert.equal(r.rendered,'SERVER_HTML');assert.match(r.messages.at(-1),/actualizado 1/);assert.equal(r.logs.find(l=>l.tag==='POCO_CART_READ').cartType,'text/javascript; charset=utf-8');});
for(const stage of ['request','parse','section','validate','render','publish'])test('sanitized diagnostic identifies '+stage+' failure',async()=>{const r=await run(stage);assert.equal(r.logs.at(-1).stage,stage);assert.match(r.messages.at(-1),/Revisar carrito/);assert.equal(r.rendered,stage==='publish'?'SERVER_HTML':'OLD');assert.ok(r.calls.every(x=>!x.includes('.json')));});
