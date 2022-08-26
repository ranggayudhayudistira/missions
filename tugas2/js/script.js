// manually scraped https://regexr.com/6sog5
const thumbnailList = ["https://hackdesign.imgix.net/lesson/avatar/99/7e1acbbf-3d1d-471f-aa10-9a39c84ea649.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=9b5cd70673437c8a6ed5a0f5a4e2fc60", 
"https://hackdesign.imgix.net/lesson/avatar/98/a6c563d1-4a6d-4ea4-852c-25f9fbc5f3df.jpg?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=562f8438103a278a7b3e937286c68862", 
"https://hackdesign.imgix.net/lesson/avatar/97/f35d1eaa-aa07-4e82-a827-517b6addaa8d.jpg?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=f1e578191a15bbb390f8772aa1e1be5a", 
"https://hackdesign.imgix.net/lesson/avatar/96/1d47aa1c-e547-4742-9778-45dd5627b7e9.jpg?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=688abdab696db7acf976ae5f6d0bf771", 
"https://hackdesign.imgix.net/lesson/avatar/95/9cc764c6-1a27-4c14-9732-66d1dd6a43f2.jpg?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=9fd6988de09103a5b3cf20c65d4da041", 
"https://hackdesign.imgix.net/lesson/avatar/94/4bd7061a-bb16-4953-86ae-af5bc00a3cae.jpg?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=c7ca5ac35b892ec6f99fc6bb13880fc7", 
"https://hackdesign.imgix.net/lesson/avatar/92/67810d46-b25c-4738-a282-491f49e00d2b.jpg?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=f1ee09a7c3386c4dd3fb6827ef382006", 
"https://hackdesign.imgix.net/lesson/avatar/59/eaa3a7f3-7005-4e11-8b58-4e751e740d87.jpg?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=9fb8944f573c771221e7f9a8d0e2a8ad", 
"https://hackdesign.imgix.net/lesson/avatar/58/08623ada-1a72-4d41-9cc9-f9a7e2a7db06.jpg?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=e45f4a8983f5261a3d1a1fccdd2fbd3a", 
"https://hackdesign.imgix.net/lesson/avatar/57/20a19aff-41fe-4d05-b517-8677caf96c6d.jpg?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=5ee6330e623ca0d83b249207f6fb19ce", 
"https://hackdesign.imgix.net/lesson/avatar/56/41c30efd-d28b-40c9-b56f-cf6b16f3203d.jpg?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=3b26525bcb6ebc911db41858c4603711", 
"https://hackdesign.imgix.net/lesson/avatar/55/90e09321-8e9c-499a-a425-3c91a1ecf5d8.jpg?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=b722e69cfc2d9c5c045d8f5c3311ce6d", 
"https://hackdesign.imgix.net/lessons/week50.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=77247be3e19aa52faf010451c13fb2e6", 
"https://hackdesign.imgix.net/lessons/week49.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=d0ea399453c1e7dfb50cce27fb2770c1", 
"https://hackdesign.imgix.net/lessons/week48.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=94b9dcd2eb01c6c0294dcd006441d13e", 
"https://hackdesign.imgix.net/lessons/week47.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=b47c66bd2db82c57d5e7e97cf4026daf", 
"https://hackdesign.imgix.net/lessons/week46.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=44e093c2d6c6af5a114d84f2d63e9c1e", 
"https://hackdesign.imgix.net/lessons/week45.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=41ce0a4c13ac447c9bbbd53e76e0d6e0", 
"https://hackdesign.imgix.net/lessons/week44.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=6bbd5e4c3024950519249a9fa39fa38f", 
"https://hackdesign.imgix.net/lessons/week43.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=24f9d3029c7d9b13245f83d79a519c19", 
"https://hackdesign.imgix.net/lessons/week42.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=e5c8bb9166079716e83031dd2e653453", 
"https://hackdesign.imgix.net/lessons/week41.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=a22c6c0c199b6178c23b1c965ee8a164", 
"https://hackdesign.imgix.net/lessons/week40.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=0d770ced9b1dedfdf81da2738b7bd06f", 
"https://hackdesign.imgix.net/lessons/week39.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=2a017c9e92bb13d9f8c9eb26889ed4ee", 
"https://hackdesign.imgix.net/lessons/week38.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=d7a0f4edd0d3a4078c96044c7994bbad", 
"https://hackdesign.imgix.net/lessons/week37.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=24147dcd067ffe9c7f341a12b34b9167", 
"https://hackdesign.imgix.net/lessons/week36.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=c94c8f97dd4571c8d090520908e1e3c8", 
"https://hackdesign.imgix.net/lessons/week35.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=ce7b2f6d4e0a828cd68702d3ea382c47", 
"https://hackdesign.imgix.net/lessons/week34.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=f8acd26f94c6ccf1e7c13fb62c864c34", 
"https://hackdesign.imgix.net/lessons/week33.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=339c5728e3bb830fdb101469a036d508", 
"https://hackdesign.imgix.net/lessons/week32.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=ea88aa664b792e9958fb4e3c8cb459f6", 
"https://hackdesign.imgix.net/lessons/week31.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=00361e0cd7b59ef5da3a8ad675698ace", 
"https://hackdesign.imgix.net/lessons/week30.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=a99c96e560bd42e93e035188d5045184", 
"https://hackdesign.imgix.net/lessons/week29.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=5a4651476b497ffecc8e9996ddf5a034", 
"https://hackdesign.imgix.net/lessons/week28.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=3baedd012742e53a19cf3e5ddc5ccd17", 
"https://hackdesign.imgix.net/lessons/week27.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=85b4f099fda48d2e4da9be51d3cca3e9", 
"https://hackdesign.imgix.net/lessons/week26.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=3d9b43c5e623378ea9e3d548ba438b75", 
"https://hackdesign.imgix.net/lessons/week25.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=8c9e54b38b33589e8014603a4bc888a2", 
"https://hackdesign.imgix.net/lessons/week24.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=49e697f5d90d2d5c08c1a9869e4874e4", 
"https://hackdesign.imgix.net/lessons/week23.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=b3774a95624a3fa555ab526440dd32f4", 
"https://hackdesign.imgix.net/lessons/week22.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=6961a61b4c6f101678671b72aa12335a", 
"https://hackdesign.imgix.net/lessons/week21.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=f015f09d209dff3b87b708a730ad045f", 
"https://hackdesign.imgix.net/lessons/week20.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=7187d83c97ff4c87cf3a7fd22657c6c5", 
"https://hackdesign.imgix.net/lessons/week19.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=a65aaa7fde6748153c5790317dcdfc64", 
"https://hackdesign.imgix.net/lessons/week18.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=822063b2ed51104b34060071c6611b1e", 
"https://hackdesign.imgix.net/lessons/week17.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=fdb39fe50a545c7ff0f94216d0e15201", 
"https://hackdesign.imgix.net/lessons/week16.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=7f5374b48e45a6f888e664f0a94e4e97", 
"https://hackdesign.imgix.net/lessons/week15.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=f63b961f01f4b3a973b3fe83488e32a4", 
"https://hackdesign.imgix.net/lessons/week14.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=736b22994cbb247fc9fd9228383dc015", 
"https://hackdesign.imgix.net/lessons/week13.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=71e748d28f26daefb873878c34f0d84a", 
"https://hackdesign.imgix.net/lessons/week12.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=c156d3edaa321771b54a270462d2920f", 
"https://hackdesign.imgix.net/lessons/week11.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=c71c4f2c6069a300f19d34cbc7651b45", 
"https://hackdesign.imgix.net/lessons/week10.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=df0fa4a6043d2cdce437fab8e316f38b", 
"https://hackdesign.imgix.net/lessons/week9.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=c48d0a0e04ebf38c4086fdefdfeef235", 
"https://hackdesign.imgix.net/lessons/week8.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=d287a9af8aad3ffa64c58cb378246642", 
"https://hackdesign.imgix.net/lessons/week7.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=fd9f13aa795848427189c88a28aa219a", 
"https://hackdesign.imgix.net/lessons/week6.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=78c14ad7a3ab90712d8f052883121e36", 
"https://hackdesign.imgix.net/lessons/week5.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=b5ed660f396d549b660ae128b993c08d", 
"https://hackdesign.imgix.net/lessons/week4.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=35bf9daaa94eba41ca60809de8fea325", 
"https://hackdesign.imgix.net/lessons/week3.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=d8fdfa41c665bb2c99f5422ad38598cb", 
"https://hackdesign.imgix.net/lessons/week2.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=96b9493c66c0e68edf6e3e666efa410c", 
"https://hackdesign.imgix.net/lessons/week1.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=cb0dc010277e4184db4f645d78abe376", 
"https://hackdesign.imgix.net/lessons/week0.png?ixlib=rails-2.1.4&dpr=2&w=128&fm=png&fit=max&auto=format&s=685a53d324c25cf18a0c9ac9a1bebc47"]
const authorPhotoList = ["https://hackdesign.imgix.net/user/avatar/283312/0df57e1e-2859-4787-87e5-cf98e9d305b1.jpeg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=662487320d49b1f3f060f006bb8348bc", 
"https://hackdesign.imgix.net/user/avatar/88598/c929fa27-e80b-41fd-9329-7e1f2c40648f.jpeg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=3ae000fac78880ad11572e5116ad241d", 
"https://hackdesign.imgix.net/user/avatar/276412/9032df89-df34-4822-9191-17fd1814573f.jpeg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=3be9b5b756d234a22bd50e2a565e0f23", 
"https://hackdesign.imgix.net/user/avatar/280329/70c77ceb-e06f-4c0b-965c-9265e203724c.jpeg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=a3d8f47959a18fb67d4c5905a7dc8c4f", 
"https://hackdesign.imgix.net/user/avatar/279566/67abac2d-8f5a-4219-9b27-73b53761f4b4.jpeg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=84bc34e170ca0aee6a8d69a841657987", 
"https://hackdesign.imgix.net/user/avatar/278850/71858550-d32e-4c0e-a4d1-0f2e69574061.jpeg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=bf9465c6517d786edf627d3d47e70441", 
"https://hackdesign.imgix.net/user/avatar/4/file.jpeg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=b216b55fe23ce3402c5c3f9ac54cd7b3", 
"https://hackdesign.imgix.net/user/avatar/41609/8ee53db2-60b4-4b64-96e6-9debb4a297d3.jpeg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=3e4a02a5df167fb398ebbba66d88b8cd", 
"https://hackdesign.imgix.net/user/avatar/55946/be070f08-3459-4ab2-9da5-0f2d8f554f3a.jpeg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=6887570f2a0dbe13cac31bf422e41924", 
"https://hackdesign.imgix.net/user/avatar/273954/80d99d4d-26ff-4619-b655-f7ce3d01adb1.png?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=0a2f730eb5c59c7a94d8a9edb0abeb45", 
"https://hackdesign.imgix.net/user/avatar/34959/bedd522d-74d6-4f48-a08a-96c8d8c3fecc.jpeg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=90123113f589711b75a6016c68566ab5", 
"https://hackdesign.imgix.net/user/avatar/59285/2acb43b6-8d4d-4161-b1a9-6eaff5957a99.png?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=823d714bfc9cde60128e4e28abf7a408", 
"https://hackdesign.imgix.net/curators/tuhinkumar@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=48b71f39f700539d3284bff404c321ac", 
"https://hackdesign.imgix.net/curators/adammorse@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=681a1b4d813aed6a1c3bb289626230ca", 
"https://hackdesign.imgix.net/user/avatar/4/file.jpeg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=b216b55fe23ce3402c5c3f9ac54cd7b3", 
"https://hackdesign.imgix.net/user/avatar/88598/c929fa27-e80b-41fd-9329-7e1f2c40648f.jpeg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=3ae000fac78880ad11572e5116ad241d", 
"https://hackdesign.imgix.net/curators/jannahagan@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=1a3f2f8be78ffb13e7159fd555982782", 
"https://hackdesign.imgix.net/curators/nikkiwill@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=357f5b38cba627d1b5d7be91a4820e7f", 
"https://hackdesign.imgix.net/curators/manikrathee@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=3368d28cd103a4125264e67e1f8d5c8e", 
"https://hackdesign.imgix.net/curators/arthurbodolec@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=7d3de7052d2b79d833e3bcb3e7e1b4c6", 
"https://hackdesign.imgix.net/curators/catnoone@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=762f4bf6f9a4c609431f5786c91a25e4", 
"https://hackdesign.imgix.net/curators/cemregngr@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=a3db54ec7a64cbc4ea5fda6cd67be139", 
"https://hackdesign.imgix.net/curators/daveobrien@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=0f7ed19b8ef0378f507b6a6b7656e45d", 
"https://hackdesign.imgix.net/curators/scotthurff@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=066c922cfd2ec443d822a66350bab8a0", 
"https://hackdesign.imgix.net/curators/bentaylor@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=a6ebc2a9f71396803014079e2e6784e7", 
"https://hackdesign.imgix.net/curators/josephhuang@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=f82bcb908bb20205294cca595fd3ea11", 
"https://hackdesign.imgix.net/curators/nireyal@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=4b2e8fb1cd31181fdc0e45da8e99afeb", 
"https://hackdesign.imgix.net/curators/kylebragger@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=c784d723db3d947363867ec605308b77", 
"https://hackdesign.imgix.net/curators/nathanmanousos@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=fa99e9d761de4e960efac15bc09fb282", 
"https://hackdesign.imgix.net/user/avatar/3/6333866d-1dba-4f5f-8ec3-bca293391b15.png?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=3ca7dc440eddd441958789c5675b1da3", 
"https://hackdesign.imgix.net/curators/redalemeden@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=c15007a3c0281d8533ab210196ba2d80", 
"https://hackdesign.imgix.net/curators/ianstormtaylor@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=1c89b7bde971f9be5e55f46d49f573c6", 
"https://hackdesign.imgix.net/curators/chrislee@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=d015b192ace0e34d628809e7adc7b20a", 
"https://hackdesign.imgix.net/curators/whitneyhess@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=933106b6ab748451fefa8ced0247f8ec", 
"https://hackdesign.imgix.net/user/avatar/4/file.jpeg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=b216b55fe23ce3402c5c3f9ac54cd7b3", 
"https://hackdesign.imgix.net/curators/andyhagerman@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=509427412608ee203c5eb355433b3b11", 
"https://hackdesign.imgix.net/curators/amythibodeau@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=91fe1ada098c02911dcbefc697a95643", 
"https://hackdesign.imgix.net/curators/chadmazzola@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=7f90489ce85ec9d491e434e611c88297", 
"https://hackdesign.imgix.net/curators/brentjackson@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=dc2ffec1e407903702c861da9eac1fc4", 
"https://hackdesign.imgix.net/curators/kylewild@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=db2dfb136b9326934bc8c8f345cf2d45", 
"https://hackdesign.imgix.net/curators/julieannhorvath@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=34cd67b646a5526105072eace93a8a43", 
"https://hackdesign.imgix.net/curators/brianbenitez@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=79f977505873f512239525a9789a0bfb", 
"https://hackdesign.imgix.net/curators/katerutter@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=b314525f1764d0d3c6f9b7533c07b5d1", 
"https://hackdesign.imgix.net/curators/lisestatelman@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=a5199b82f48163fb8971bc7d0ff0ed01", 
"https://hackdesign.imgix.net/curators/davidkadavy@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=0f25b8c388f25e89d0c81f91fa3f5815", 
"https://hackdesign.imgix.net/curators/joannechang@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=d0ae4ccfeba5465a8866b1c2c4f988fa", 
"https://hackdesign.imgix.net/curators/travissilverman@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=f304a231681cf62e7db2d514508df73f", 
"https://hackdesign.imgix.net/curators/karolinaszczur@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=d7979f409c41daf77d2545029f11082b", 
"https://hackdesign.imgix.net/curators/pjonori@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=c966621d72c315430d97c34213353fd1", 
"https://hackdesign.imgix.net/curators/jeffbroderick@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=86667333f6a8aa8e230daa8b1a8397ef", 
"https://hackdesign.imgix.net/curators/graceng@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=17040b2911cad54e6bd43856a16adab0", 
"https://hackdesign.imgix.net/curators/patrickalgrim@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=9aa8943a9cb4c17568f698039937fa66", 
"https://hackdesign.imgix.net/curators/joerobinson@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=84fbccf2083fabcd9a5c9e394c1abca4", 
"https://hackdesign.imgix.net/curators/danzambonini@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=2d30b4aa05b19ded3f50b4f993964e0a", 
"https://hackdesign.imgix.net/curators/moizsyed@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=57cdde34e519c9788cc4dcd450d7dd71", 
"https://hackdesign.imgix.net/curators/jongold@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=433e74accbbba3a0e7b04595d2eff2cd", 
"https://hackdesign.imgix.net/curators/sachagreif@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=ce733412d3442841272f8ce328fe95ab", 
"https://hackdesign.imgix.net/curators/jarederondu@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=d3779433ac231f8cf8d5496392d66ffb", 
"https://hackdesign.imgix.net/curators/marcedwards@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=8294556c556375ce08b666ab0959d826", 
"https://hackdesign.imgix.net/user/avatar/6/9e34ae4c-5eca-483a-8eeb-d9b6e595b5d2.jpeg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=51106f1cbd738e00f9355126f860d37e", 
"https://hackdesign.imgix.net/curators/keremsuer@2x.jpg?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=fe7b2e77ad4cd1d25754439d8a005e78", 
"https://hackdesign.imgix.net/user/avatar/3/6333866d-1dba-4f5f-8ec3-bca293391b15.png?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=3ca7dc440eddd441958789c5675b1da3", 
"https://hackdesign.imgix.net/user/avatar/3/6333866d-1dba-4f5f-8ec3-bca293391b15.png?ixlib=rails-2.1.4&dpr=2&w=40&h=40&fit=crop&fm=jpeg&auto=format&mask=ellipse&s=3ca7dc440eddd441958789c5675b1da3"];

// ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function generateLorem(query) {
    var lorem = new Lorem;
    lorem.type = Lorem.TEXT;
    lorem.query = query;
    return lorem.createLorem(null);
}

function loadPost(count) {
    for(var i = 0; i < count; i++) {
        var postTitle = generateLorem("3-12w");
        var postSnippet = generateLorem("50-150w");
        var postThumbnail = thumbnailList[getRandomInt(0,62)];
        var authorName = generateName();
        var authorPhoto = authorPhotoList[getRandomInt(0,62)];
        var string = `<div class="post-container center flex">
        <div class="post-thumbnail">
            <a href="#"> 
                <img class="lazyload" data-src="`+ postThumbnail +`"/>
            </a>
        </div>
        <div class="post-detail">
            <h3 class="post-title text-red">
                <a href="#">
                    `+ postTitle +`
                </a>
            </h3>
            <p class="post-snippet">
                `+ postSnippet +`
            </p>
            <div class="post-footer center flex">
                <div class="post-button clickable btn font-bold shadow inline">
                    <a href="#">
                        Read lesson
                    </a>
                </div>
                <div class="flex-fill"></div>
                <div class="post-author center flex">
                    <h4 class="post-author-name text-gray">`+ authorName +`</h4>
                    <img class="post-author-photo" src="`+ authorPhoto +`"/>
                </div>
            </div>
        </div>
    </div>
        `;
        $(string).insertBefore("#load-more");
    }
}

const lozadObserver = lozad('.lazyload', {
    load: function(el) {
        el.src = el.dataset.src;
    }
});

$(document).ready(function() {
    loadPost(10);
    lozadObserver.observe();
});

$('#load-more').click(function() {
    loadPost(5);
    lozadObserver.observe();
})