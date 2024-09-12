//获取🐍
const snake = document.getElementById('snake')
//获取蛇的部分
const snakes = snake.getElementsByTagName('div')

//获取食物部分
const food = document.getElementById('food')

//获取分数和等级
const scoreSpan = document.getElementById('score')
const levelSpan = document.getElementById('level')

//存储分数和等级
let score = 0
let level = 0

/* 随机生成食物 在0~290之间 */
function changeFood() {
    //生成0~29的随机数*10  floor:向下取整
    const fx = Math.floor(Math.random() * 30) * 10
    const fy = Math.floor(Math.random() * 30) * 10

    //设置坐标
    food.style.left = fx + 'px'
    food.style.top = fy + 'px'
}

//存储蛇的移动方向
let dir

//创建一个变量记录按键状态
let keyActive = true

/* 
 绑定按键事件keydown keyup
    - 键盘事件只能绑定给可以获取焦点的元素或者是document
*/

const keyArr = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

//创建对象
const reObj = {
    ArrowUp: 'ArrowDown',
    ArrowDown: 'ArrowUp',
    ArrowLeft: 'ArrowRight',
    ArrowRight: 'ArrowLeft',
}

document.addEventListener('keydown', (event) => {
    //console.log(event.key)
    if (keyActive && keyArr.includes(event.key)) {
        if (snakes.length < 2 || reObj[dir] !== event.key) {
            //设置方向
            dir = event.key
            keyActive = false
        }
    }
})

/* 控制🐍移动，移动时，变化蛇尾巴的位置即可 */
setTimeout(function move() {
    //获取蛇头
    const head = snakes[0]

    //获取蛇头坐标
    let x = head.offsetLeft
    let y = head.offsetTop
    // console.log(x, y)

    switch (dir) {
        case "ArrowUp":
            y -= 10
            // console.log(x, y)
            break;
        case 'ArrowDown':
            y += 10
            // console.log(x, y)
            break;
        case 'ArrowLeft':
            x -= 10
            break;
        case 'ArrowRight':
            x += 10
            break;
    }

    //判断是否吃到食物
    if (head.offsetTop === food.offsetTop &&
        head.offsetLeft === food.offsetLeft
    ) {
        changeFood()
        //增加身体
        snake.insertAdjacentHTML('beforeend', '<div/>')
        score++
        scoreSpan.textContent = score

        //等级变化
        if (score % 3 === 0) {
            level++
            levelSpan.textContent = level + 1
        }
    }

    /* 判断游戏结束 */
    //撞墙
    if (x < 0 || x > 290 || y < 0 || y > 290) {
        alert("撞墙啦~游戏结束")
        return
    }

    //撞到自己
    for (let i = 0; i < snakes.length - 1; i++) {
        if (
            snakes[i].offsetLeft === x && snakes[i].offsetTop === y
        ) {
            alert('GAMEOVER~')
            return
        }
    }

    //获取尾巴
    const tail = snakes[snakes.length - 1]
    //移动位置
    tail.style.left = x + 'px'
    tail.style.top = y + 'px'
    //将尾巴移动到蛇头位置
    snake.insertAdjacentElement('afterbegin', tail)
    keyActive = true

    setTimeout(move, 300 - level * 20)
}, 300)