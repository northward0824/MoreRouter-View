

const mains = Vue.component("mains",{
    template:`<main>
        
        <div class="left">
           <router-view name="left"></router-view>
        </div>
        <div class="right">
           <router-view name="right"></router-view>
        </div>
    </main>`
});


const Left = Vue.component("left",{
    template:`<div>
        <ul v-for="item in data">
            <li>
                <router-link :to="'#'+item.id">{{item.title}}</router-link>
                <ul>
                    <li  v-for="ite in item.child">
                        <router-link :to="'#'+ite.id">{{ite.title}}</router-link>
                    </li>
                </ul>
            </li>
        </ul>
        </div>`,
    data(){
      return {
          menu:{},
      }
    },
    ///////因为数据是异步获取的，需要使用实时computed属性，this.menu变化后页面中的data数据发生变化///
    computed:{
        data(){
            ///////////数据结构//////////
            ////[
            //     {id:1,title:"title1",pid:0,
            //       child:[{id:5,title:"title5",pid:1},
            //              {id:6,title:"title6",pid:1}
            //          ]
            //      }
            //      {id:2,title:"title2",pid:0,
            //       child:[{id:7,title:"title7",pid:2},
            //              {id:8,title:"title8",pid:2}
            //          ]
            //      }
            // ]
            var arr = [];
            for(let i in this.menu){
                if(this.menu[i].pid == "0"){
                    arr.push(this.menu[i]);
                }else{
                    for(let j in arr){
                        if(arr[j].id == this.menu[i].pid){
                            if(arr[j].child){
                                arr[j].child.push(this.menu[i]);
                            }else{
                                arr[j].child = [];
                                arr[j].child.push(this.menu[i]);
                            }
                        }
                    }

                }
            }
            return arr;
        }
    },
    created(){
        fetch("./data.txt").then(function (e) {
            return e.json();
        }).then((e)=>{
            this.menu = e;
        })
    },
    watch: {
        ///////监听$route，路径一变化就重新改变right的scrollTop到目标div的scrollTop//////
        $route: function(newValue, oldValue) {
            var id = this.$route.hash.slice(1);
            var top = document.querySelector(`.${id}`).offsetTop-60;
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }

            new TWEEN.Tween({ tweeningNumber: document.querySelector(".right").scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ tweeningNumber: top }, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.tweeningNumber.toFixed(0)
                })
                .start();
            animate()
        }
    }
});
const Right = Vue.component("right",{
    template:`<div class="markdown-body" v-html="datas"></div>`,
    data(){
        return {
            data:{}
        }
    },
    computed:{
        datas(){
            return this.data;
        }
    },
    created(){
        fetch("./html.txt").then(function (e) {
            return e.text();
        }).then((e)=>{
            this.data = e;
        })
    }
});


// $({start:0}).animate({start:100},
//     {duration:1000,step:function (e) {}
//
// })


const two = Vue.component("two",{
    template:`<div>two two two</div>`
})


