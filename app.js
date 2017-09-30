var button = document.querySelector('button');
var input = document.querySelector('#generalTest');
var input1 = document.querySelector("#input1");
var input2 = document.querySelector("#input2");
var span = document.querySelector("span");
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
// var observable = Rx.Observable.interval(1000)
// .map((value)=>{
//     return 'Number:'+value;
// })
// .throttleTime(2000)
// .subscribe(
//     v => {
//         console.log(v)
//     },
//     e => {
//         console.log('Error', e)
//     },
//     () => {
//         console.log('Completed')
//     }
// );

//Subject 
// var subject = new Rx.Subject();
// subject.subscribe((value)=>{
//     console.log(value);
// },(error) =>{
//     console.log(error);
// },(complete)=>{
//     console.log(complete);
// });

// subject.next("this is cool");
// // subject.error("this is uncool");
// subject.complete("this is complete");

// //Interval Filter
var observable = Rx.Observable.interval(1000);

observable
    .filter(function(value){
        return value % 2 == 0;
    })
    .subscribe({
        next: function(value){
            console.log(value);
        },
        error : function(error){
            console.log('Error:',error);
        }
    })

var search = Rx.Observable.fromEvent(input,'input');

search
.map(event => event.target.value)
.debounceTime(500)
.distinctUntilChanged()
.subscribe((value)=>{
    console.log(value);
});

search
.map(event => event.target.value)
.debounceTime(500)
.distinctUntilChanged()
.subscribe((value)=>{
    console.log(value);
});



// of in rxjs.. used to pass list of elements in observable . it is work synchronysly and immediately;
// scan is use for calculate and inbetween totals
// reduce is use for final total 
var scanReduceTest = Rx.Observable.of(1,2,3,4,5);
scanReduceTest
// .scan((total,currentValue)=>{
//     return total + currentValue;
// })
.reduce((total,currentValue)=>{
    return total + currentValue;
},0)
.subscribe((value)=>{
    console.log("this is triggered");
    console.log(value);
});


//Merge map 

var obs1 = Rx.Observable.fromEvent(input1,'input');
var obs2 = Rx.Observable.fromEvent(input2,'input');

obs1.mergeMap((event1) =>{
    return obs2.map((event2)=>{
        return event1.target.value + ' ' + event2.target.value;
    })
}).subscribe((combinedValue)=>{
     console.log(combinedValue);
      span.textContent = combinedValue;
})


// Switch map .. emmit the other observable or value based on the other observable subscription.
var switchMapMain = Rx.Observable.fromEvent(button,'click')
var switchMapOther = Rx.Observable.interval(1000);

switchMapMain.switchMap(
    (event)=>{
        return switchMapOther.map((value) => "this is cool"+value);
    }
).subscribe((value)=>{
    console.log(value);
})

//Behavioural subject is helpfull for initialization problem compare to normal subject...

var clickEmitted = new Rx.BehaviorSubject('Not Clicked');

button.addEventListener("click",()=>{
    clickEmitted.next("Clicked");
});

clickEmitted.subscribe(
    (value) => span.textContent = value
)