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
        bg:{
            type: cc.Sprite,
            default: null
        },
        label:{
            type: cc.Label,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
    // },

    start () {
        cc.log("start");
        this.bg.node.on(cc.Node.EventType.TOUCH_END, this.colorPoint, this);
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

        // // 渲染一次摄像机，即更新一次内容到 RenderTexture 中
        camera.render();

        // 这样我们就能从 RenderTexture 中获取到数据了
        let data = render_texture.readPixels(null, location.x, location.y, 1, 1);
        cc.log("--", "data", data);
        this.label.node.color = cc.color(data[0],data[1],data[2]);

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
});
