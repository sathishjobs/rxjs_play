var button = document.querySelector('button');
// button.addEventListener('click',(event)=>{
//     console.log(event);
// });

// // This ill create new Observable based on events.
// Rx.Observable.fromEvent(button,'click')
// .throttleTime(6000)
// .map(data => {
//     return data.clientY
// })
// .subscribe(
//     event => { console.log("clicked") },
//     // e => { console.log(e) },
//     // () => { console.log('complete') }
// );


// var test  = Rx.Observable.create(subscriber => {
//   button.onclick =(function(){
//       subscriber.next("this is clicked");
//   })
// })
// var check = test.subscribe(
//     v => { console.log(v) },
//     e => { console.log(e) },
//     () => { console.log('complete') }
// );

// setTimeout(()=>{
//     check.unsubscribe();
// },5000)


//interval operator 
var observable = Rx.Observable.interval(1000)
.map((value)=>{
    return 'Number:'+value;
})
.throttleTime(2000)
.subscribe(
    v => {
        console.log(v)
    },
    e => {
        console.log('Error', e)
    },
    () => {
        console.log('Completed')
    }
);