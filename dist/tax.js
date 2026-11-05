(function(root){
const limits=[1000,1500,2000,2500,3000,4000,6000,Infinity], rates=[.06,.09,.12,.16,.20,.24,.29,.34];
const ALLOWANCE=774, PERSONAL_REBATE=10, DEPENDENT_REBATE=10;
function calculate({monthly,currency='Bs',rate,ut,kind='salary',cost=0,extra=0,withheld=0,dependents=0,profit=0,vacation=0}){
 const values=[monthly,rate,ut,cost,extra,withheld,dependents,profit,vacation];
 if(values.some(v=>!Number.isFinite(v))||monthly<0||rate<=0||ut<=0||cost<0||extra<0||withheld<0||profit<0||vacation<0)throw Error('Revisa los valores: ingresos y deducciones no negativos; tasa y UT mayores que cero.');
 if(dependents<0||!Number.isInteger(dependents))throw Error('Las cargas familiares deben ser un número entero igual o mayor que cero.');
 const factor=currency==='USD'?rate:1, gross=(monthly*12+extra+profit+vacation)*factor, costs=kind==='independent'?cost*12*factor:0;
 if(costs>gross)throw Error('Los gastos superan el ingreso anual. Las pérdidas requieren un análisis fuera de este simulador.');
 const net=gross-costs, base=Math.max(0,net/ut-ALLOWANCE); let prev=0,total=0;
 const bands=limits.map((limit,i)=>{const portion=Math.max(0,Math.min(base,limit)-prev), tax=portion*rates[i];const row={from:prev,to:limit,rate:rates[i],portion,tax};total+=tax;prev=limit;return row});
 const rebate=PERSONAL_REBATE+DEPENDENT_REBATE*dependents;
 const caused=Math.max(0,total-rebate)*ut, credits=withheld, balance=Math.max(0,caused-credits), excess=Math.max(0,credits-caused);
 if(![gross,net,base,total,caused,balance].every(Number.isFinite))throw Error('Los valores son demasiado grandes.');
 // Tasa marginal: la del tramo donde cae la última UT de base. Sin base gravable, 0.
 const marginal=base>0?rates[limits.findIndex(l=>base<=l)]:0;
 // Enriquecimiento neto anual (Bs) a partir del cual se entra al tramo de 34 %.
 const topBracketNet=(limits[limits.length-2]+ALLOWANCE)*ut;
 return {gross,costs,net,base,bands,before:total*ut,rebate,caused,balance,excess,marginal,topBracketNet,declare:net>1000*ut||gross>1500*ut,effective:gross?caused/gross:0};
}
root.ISLR={calculate,limits,rates,ALLOWANCE,PERSONAL_REBATE,DEPENDENT_REBATE};
})(typeof module!=='undefined'?module.exports:globalThis);
