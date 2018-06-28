let n
let slidesTime=makeClock()
let $Allbuttons=$(".wrapper>button")
var clickSlide=true
initSlides()
buttonEvent($Allbuttons)
$('.wrapper').on('mouseenter',()=>{
    clearInterval(slidesTime)
})
$('.wrapper').on('mouseleave',()=>{
    slidesTime=makeClock()
})




























//下面为工具函数
function initSlides(){
    n=1
    $('.images>img:nth-child(1)').addClass('current')
    .siblings().addClass('enter')
}
function num(x) {
    if (x>3) {
        x=x%3
        if (x===0) {
            x=3
        }
    }
    return x
}
function getImages(n) {
    return $(`.images>img:nth-child(${num(n)})`)
}
function makeCurrent($node) {
    return $node.removeClass('enter').addClass('current')
}
function makeLeave($node) {
    return $node.removeClass('current').addClass('leave')
}
function makeEnter($node) {
    return $node.removeClass('leave').addClass('enter')
}
function makeClock(){
    return setInterval(()=>{
        nextImage(n)
        n++
    },1500)
}
function nextImage(n){
    makeLeave(getImages(n)).one('transitionend',(slideTarget)=>{
        makeEnter($(slideTarget.currentTarget))
        clickSlide=true
    })
    makeCurrent(getImages(n+1))
}
function buttonEvent($nodes) {
    for(let i=0;i<$nodes.length;i++){
        $($nodes[i]).on("mouseenter",(enterTarget)=>{
            $(enterTarget.currentTarget).addClass('active')
        })
        $($nodes[i]).on("mouseleave",(enterTarget)=>{
            $(enterTarget.currentTarget).removeClass('active')
        })
        $($nodes[0]).unbind("click").on("click",(targetButton)=>{
            if (clickSlide) {
                $(targetButton.currentTarget).addClass('activeClick')
                .siblings().removeClass('activeClick')
                nextImage(n)
                n++
                clickSlide=false
            }
        })
    }
}
