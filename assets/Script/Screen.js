// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        camera:{
            type: cc.Camera,
            default: null
        },
        camera_bg:{
            type: cc.Sprite,
            default: null
        },
        btn_label:{
            type: cc.Label,
            default: null
        },
        label_state:{
            type: cc.Label,
            default: null
        },
        show_take_pic_sprite:{
            type: cc.Sprite,
            default: null
        },
        enemy:{
            type: cc.Sprite,
            default: null
        },
        pw:0,
        ph:0,
        os_camera:null,
        os_camera_x:0,
        os_camera_y:0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        var sys_info = wx.getSystemInfoSync();
        self.pw = sys_info.windowWidth / cc.visibleRect.width;
        self.ph = sys_info.windowHeight / cc.visibleRect.height;
        self.btn_label.string = "打开摄像头";
    },

    start () {
        cc.log("start");
        // this.bg.node.on(cc.Node.EventType.TOUCH_END, this.colorPoint, this);
        this.btn_label.node.on(cc.Node.EventType.TOUCH_END, this.takePicture, this);
    },

    // update (dt) {},
    colorPoint (event){
        var location = event.getLocation();
        cc.log(location.x, location.y);
        location = this.camera.getScreenToWorldPoint(location);
        cc.log(location.x, location.y);
        // let posInNode = this.node.convertToNodeSpaceAR(location)
        // cc.log(posInNode.x, posInNode.y);
        // console.log(ctx.getImageData(50, 50, 100, 100));
        // let spriteFrame = this.node.getComponent(cc.Sprite).spriteFrame;
        // if (spriteFrame == null) {
        //     return false
        // }
        // let rect = spriteFrame.getRect();
        // let offset = spriteFrame.getOffset();
        // let posInRect = cc.v2(parseInt(posInNode.x - offset.x + rect.width / 2), parseInt(posInNode.y - offset.y + rect.height / 2));

        // let tex = spriteFrame.getTexture();
        // let gl = cc.game._renderContext;
        // var rt = new cc.RenderTexture();
        // rt.initWithSize(rect.width, rect.height, gl.STENCIL_INDEX8);
        // rt.drawTextureAt(tex, 0, 0);
        // tex.render();
        // let data = rt.readPixels();
        // cc.log("--", "data", data);
        // data就是这个texture的rgba值数组
        // let data;
        // if (spriteFrame.isRotated())
        // {
        //     data = rt.readPixels(null, rect.x + posInRect.y, rect.y + posInRect.x, 1, 1)
        //     cc.log("--", "data", data, rect.x + posInRect.y, rect.y + posInRect.x)
        // }
        // else{
        //     data = rt.readPixels(null, rect.x + posInRect.x, rect.y + rect.height - posInRect.y, 1, 1)
        //     cc.log("--", "data", data, rect.x + posInRect.x, rect.y + rect.height - posInRect.y)
        // }
        // let node = new cc.Node();
        // node.parent = cc.director.getScene();
        let camera = this.camera.node.parent.addComponent(cc.Camera);
        // let camera = this.camera;

        // 设置你想要的截图内容的 cullingMask
        // camera.cullingMask = 0xffffffff;

        // 新建一个 RenderTexture，并且设置 camera 的 targetTexture 为新建的 RenderTexture，这样 camera 的内容将会渲染到新建的 RenderTexture 中。
        let render_texture = new cc.RenderTexture();
        // 如果截图内容中不包含 Mask 组件，可以不用传递第三个参数
        render_texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);
        camera.targetTexture = render_texture;

        // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
        camera.render();

        // 这样我们就能从 RenderTexture 中获取到数据了
        let data = render_texture.readPixels(null, location.x, location.y, 1, 1);
        cc.log("--", "data", data);
        this.btn_label.node.color = cc.color(data[0],data[1],data[2]);

        // let spriteFrame = new cc.SpriteFrame();
        // spriteFrame.setTexture(render_texture);
        // //更新残影图片
        // let sprite_temp = new cc.Sprite();
        // sprite_temp.parent = this.sprite.parent;
        // sprite_temp.spriteFrame = spriteFrame;
        // 接下来就可以对这些数据进行操作了
        // let canvas = document.createElement('canvas');
        // let ctx = canvas.getContext('2d');
        // let width = canvas.width = texture.width;
        // let height = canvas.height = texture.height;

        // canvas.width = texture.width;
        // canvas.height = texture.height;

        // let rowBytes = width * 4;
        // for (let row = 0; row < height; row++) {
        //     let srow = height - 1 - row;
        //     let imageData = ctx.createImageData(width, 1);
        //     let start = srow*width*4;
        //     for (let i = 0; i < rowBytes; i++) {
        //         imageData.data[i] = data[start+i];
        //     }

        //     ctx.putImageData(imageData, 0, row);
        // }

        // let dataURL = canvas.toDataURL("image/jpeg");
        // let img = document.createElement("img");
        // img.src = dataURL;
    },

    //随机照片中的一个点
    getColorByRandomPoint(){
        var self = this;
        let camera = self.camera.node.parent.addComponent(cc.Camera);

        // 新建一个 RenderTexture，并且设置 camera 的 targetTexture 为新建的 RenderTexture，这样 camera 的内容将会渲染到新建的 RenderTexture 中。
        let render_texture = new cc.RenderTexture();
        // 如果截图内容中不包含 Mask 组件，可以不用传递第三个参数
        render_texture.initWithSize(cc.visibleRect.width, cc.visibleRect.height);
        camera.targetTexture = render_texture;

        // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
        camera.render();

        // 这样我们就能从 RenderTexture 中获取到数据了
        var location = self.show_take_pic_sprite.node.parent.convertToWorldSpaceAR(cc.v2(self.show_take_pic_sprite.node.x, self.show_take_pic_sprite.node.y));
        let show_width = self.show_take_pic_sprite.node.width * self.show_take_pic_sprite.node.scaleX;
        let show_height = self.show_take_pic_sprite.node.height * self.show_take_pic_sprite.node.scaleY;
        let r_x = location.x - show_width * 0.5 + Math.floor(Math.random() * show_width);
        let r_y = location.y - show_height * 0.5 +  Math.floor(Math.random() * show_height);
        self.label_state.string += "\nr_x" +Math.floor(r_x)+",r_y"+Math.floor(r_y);
        let data = render_texture.readPixels(null, r_x, r_y, 1, 1);
        return cc.color(data[0],data[1],data[2]);
    },

    setColor(cc_color){
        var self = this;
        self.enemy.node.color = cc_color;
    },

    takePictureCallFunc(){
        var self = this;
        self.setColor(self.getColorByRandomPoint());
    },

    //拍照接口
    takePicture(event){
        let self = this;
        cc.log("平台：" + cc.sys.platform);
        cc.log("cc.sys.WECHAT_GAME" + cc.sys.WECHAT_GAME);
        if(self.btn_label.string == "打开摄像头"){
            self.btn_label.string = "拍照";
            if(cc.sys.platform == cc.sys.WECHAT_GAME){
                self.openCameraWX();
            }
        }
        else if(self.btn_label.string == "拍照"){
            if(cc.sys.platform == cc.sys.WECHAT_GAME){
                self.takePictureByWX();
            }
        }
    },

    //微信打开摄像头
    openCameraWX(){
        let self = this;
        var location = self.camera_bg.node.parent.convertToWorldSpaceAR(cc.v2(self.camera_bg.node.x, self.camera_bg.node.y));
        cc.log(location.x, location.y);
        // self.label_state.string = "x"+Math.floor(location.x)+",y"+Math.floor(cc.visibleRect.height - location.y - 100);
        // self.label_state.string += "\nx" +sys_info.screenWidth+",y"+sys_info.screenHeight;
        // self.label_state.string += "\nx" +sys_info.windowWidth+",y"+sys_info.windowHeight;
        // self.label_state.string += "\nx" +Math.floor(cc.visibleRect.width)+",y"+Math.floor(cc.visibleRect.height);
        // self.label_state.string += "\nx" +Math.floor(os_camera_position.x)+",y"+Math.floor(os_camera_position.y);
        // self.label_state.string += "\npixelRatio" +sys_info.pixelRatio;
        if(self.os_camera == null){
            var os_camera = null;
            self.label_state.string += "\nx" +((location.x - self.camera_bg.node.width * 0.5) * self.pw);
            os_camera = wx.createCamera({
                x:(location.x - self.camera_bg.node.width * 0.5) * self.pw,
                y:(cc.visibleRect.height - location.y - self.camera_bg.node.height * 0.5) * self.ph,
                width:self.camera_bg.node.width * self.pw,
                height:self.camera_bg.node.height * self.ph,
                success:function(res){
                    self.os_camera = os_camera;
                    self.os_camera_x = self.os_camera.x;
                    self.os_camera_y = self.os_camera.y;
                },
                fail:function(res){
                    self.label_state.string = "fail";
                }
            });
            // setTimeout(function () {
            //     self.os_camera = os_camera;
            // }, 1000);
        }
        else{
            self.os_camera.x = self.os_camera_x;
            self.os_camera.y = self.os_camera_y;
        }
        // wx.chooseImage({
        //     count: 1,
        //     sizeType: [ 'compressed'],
        //     sourceType: ['album', 'camera'],
        //     success(res) {
        //         cc.loader.load(res.tempFilePaths[0], function(err, texture){   
        //             self.show_take_pic_sprite.spriteFrame = new cc.SpriteFrame(texture);
        //             self.show_take_pic_sprite.width = 100;
        //             self.show_take_pic_sprite.height = 100;
        //         });
        //         // wx.getFileSystemManager().readFile({
        //         //     filePath: res.tempFilePaths[0], //选择图片返回的相对路径
        //         //     encoding: 'base64', //编码格式
        //         //     success: res => { //成功的回调
        //         //         cc.log('data:image/png;base64,' , res.data);
        //         //         self.createPicture(res.data);
        //         //     }
        //         // });
        //     }
        // });
    },
    takePictureByWX(){
        let self = this;
        if(self.os_camera != null){
            self.btn_label.string = "拍照中。。。";
            self.os_camera.takePhoto("normal")
            .then(res => {
                if(res.tempImagePath == null){
                    self.btn_label.string = "拍照";
                    self.label_state.string = "拍照失败";
                    return;
                }
                // self.label_state.string = res.tempImagePath;
                cc.loader.load(res.tempImagePath, function(err, texture){   
                    self.show_take_pic_sprite.spriteFrame = new cc.SpriteFrame(texture);
                    self.show_take_pic_sprite.node.scaleX = 100 / texture.width;
                    self.show_take_pic_sprite.node.scaleY = 100 / texture.height;
                    self.btn_label.string = "打开摄像头";
                    self.os_camera.x = -self.os_camera.width;
                    self.os_camera.y = -self.os_camera.height;
                    // self.os_camera.destroy();
                    // self.os_camera = null;
                    self.takePictureCallFunc();
                });
            });
        }
    },
});
