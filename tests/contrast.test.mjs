import {test} from 'node:test';import assert from 'node:assert/strict';
const lum=h=>{const v=h.match(/../g).map(s=>parseInt(s,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);return .2126*v[0]+.7152*v[1]+.0722*v[2];};
test('brand text and action color pairs meet WCAG AA normal text contrast',()=>{for(const [fg,bg] of [['192C46','F1F4F2'],['FFFFFF','2855D9'],['192C46','B8CEC7'],['FFFFFF','192C46']]){const a=lum(fg),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);console.log(fg+'/'+bg+': '+ratio.toFixed(2)+':1');assert.ok(ratio>=4.5);}});
