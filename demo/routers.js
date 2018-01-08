

const route = [
    {path:"/",component:mains,
        children:[
            {
                path:"",
                components:{
                    left:Left,
                    right:Right
                }
            }
        ]
    },
    {
        path:"/twoQuick",component:two
    }
];
const router = new VueRouter(
    {routes:route}
);
