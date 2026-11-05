const {ISLR:{calculate:c}}=require('./dist/tax.js');const assert=require('node:assert/strict');let count=0;function near(a,b){assert.ok(Math.abs(a-b)<1e-6,`${a} != ${b}`);count++;}const p={monthly:0,rate:900,ut:43,currency:'Bs'};near(c(p).caused,0);
for(const [base,tax] of [[1000,60],[1500,105],[2000,165],[2500,245],[3000,345],[4000,585],[6000,1165],[7000,1505]]){const income=(base+774)*43;near(c({...p,monthly:income/12}).caused,(tax-10)*43);const a=c({...p,monthly:(income-.001)/12}).caused,b=c({...p,monthly:(income+.001)/12}).caused;assert.ok(b>=a&&b-a<.001);count++;}
assert.equal(c({...p,monthly:43000/12}).declare,false);assert.equal(c({...p,monthly:43000/12+.01}).declare,true);count+=2;
assert.equal(c({...p,kind:'independent',monthly:64500/12,cost:3000}).declare,false);assert.equal(c({...p,kind:'independent',monthly:64500/12+.01,cost:3000}).declare,true);count+=2;
assert.equal(c({...p,kind:'independent',monthly:5000,cost:1000}).declare,true);count++;
const a=c({...p,monthly:500,currency:'USD'}),b=c({...p,monthly:450000});near(a.caused,b.caused);near(a.caused,1786629.12);
near(c({...p,monthly:500,currency:'USD',withheld:a.caused+100}).balance,0);near(c({...p,monthly:500,currency:'USD',withheld:a.caused+100}).excess,100);
assert.equal(c({...p,kind:'independent',monthly:10000,cost:10000}).declare,true);near(c({...p,kind:'independent',monthly:10000,cost:10000}).caused,0);count++;
for(const bad of [{ut:0},{rate:0},{monthly:-1},{monthly:NaN},{kind:'independent',monthly:1,cost:2}]){assert.throws(()=>c({...p,...bad}));count++;}
// Cargas familiares: 10 UT de rebaja adicional por cada carga.
const inc3000=(3000+774)*43;near(c({...p,monthly:inc3000/12,dependents:2}).caused,(345-30)*43);near(c({...p,monthly:inc3000/12,dependents:2}).rebate,30);
near(c({...p,monthly:inc3000/12,dependents:40}).caused,0);
// Utilidades y bono vacacional suman al ingreso anual igual que otros ingresos.
near(c({...p,monthly:1000,profit:3000,vacation:1500}).gross,c({...p,monthly:1000,extra:4500}).gross);near(c({...p,monthly:100,currency:'USD',profit:50,vacation:20}).gross,(1200+70)*900);
// Tasa marginal y umbral del tramo de 34 %.
near(c(p).marginal,0);near(c({...p,monthly:1774*43/12}).marginal,.06);near(c({...p,monthly:(1774*43+43)/12}).marginal,.09);near(c({...p,monthly:500,currency:'USD'}).marginal,.34);near(c(p).topBracketNet,6774*43);
for(const bad of [{dependents:-1},{dependents:1.5},{profit:-1},{vacation:NaN}]){assert.throws(()=>c({...p,...bad}));count++;}
console.log(`${count} comprobaciones aprobadas.`);
