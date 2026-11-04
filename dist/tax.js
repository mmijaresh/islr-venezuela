(function(root){
const limits=[1000,1500,2000,2500,3000,4000,6000,Infinity], rates=[.06,.09,.12,.16,.20,.24,.29,.34];
function calculate({monthly,currency='Bs',rate,ut,kind='salary',cost=0,extra=0,withheld=0}){
 const values=[monthly,rate,ut,cost,extra,withheld];
 if(values.some(v=>!Number.isFinite(v))||monthly<0||rate<=0||ut<=0||cost<0||extra<0||withheld<0)throw Error('Revisa los valores: ingresos y deducciones no negativos; tasa y UT mayores que cero.');
 const factor=currency==='USD'?rate:1, gross=(monthly*12+extra)*factor, costs=kind==='independent'?cost*12*factor:0;
 if(costs>gross)throw Error('Los gastos superan el ingreso anual. Las pérdidas requieren un análisis fuera de este simulador.');
 const net=gross-costs, base=Math.max(0,net/ut-774); let prev=0,total=0;
 const bands=limits.map((limit,i)=>{const portion=Math.max(0,Math.min(base,limit)-prev), tax=portion*rates[i];const row={from:prev,to:limit,rate:rates[i],portion,tax};total+=tax;prev=limit;return row});
 const caused=Math.max(0,total-10)*ut, credits=withheld, balance=Math.max(0,caused-credits), excess=Math.max(0,credits-caused);
 if(![gross,net,base,total,caused,balance].every(Number.isFinite))throw Error('Los valores son demasiado grandes.');
 return {gross,costs,net,base,bands,before:total*ut,caused,balance,excess,declare:net>1000*ut||gross>1500*ut,effective:gross?caused/gross:0};
}
root.ISLR={calculate,limits,rates};
})(typeof module!=='undefined'?module.exports:globalThis);
