let n
initSlides()
let slidesTime=makeClock()
$('.images').on('mouseenter',()=>{
    clearInterval(slidesTime)
})
$('.images').on('mouseleave',()=>{
    slidesTime=makeClock()
})





















//下面为工具函数
function initSlides(){
    n=1
    $('.images>img:nth-child(1)').addClass('current')
    .siblings().addClass('enter')
}
function num(x) {
    if (x>11) {
        x=x%11
        if (x===0) {
            x=11
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
        makeLeave(getImages(n)).one('transitionend',(slideTarget)=>{
            makeEnter($(slideTarget.currentTarget))
        })
        makeCurrent(getImages(n+1))
        n++
    },600)
}