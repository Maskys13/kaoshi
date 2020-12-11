/**
 * 
 * @authors cherish yii2 (cherish@cherish.pw)
 * @date    2020-12-10 16:48:28
 * @version v1.0
 * @description the core js of todolist project
 * 
 * ━━━━━━神兽出没━━━━━━
 * 　　   ┏┓　 ┏┓
 * 　┏━━━━┛┻━━━┛┻━━━┓
 * 　┃              ┃
 * 　┃       ━　    ┃
 * 　┃　  ┳┛ 　┗┳   ┃
 * 　┃              ┃
 * 　┃       ┻　    ┃
 * 　┃              ┃
 * 　┗━━━┓      ┏━━━┛ Code is far away from bugs with the animal protecting.
 *       ┃      ┃     神兽保佑,代码无bug。
 *       ┃      ┃
 *       ┃      ┗━━━┓
 *       ┃      　　┣┓
 *       ┃      　　┏┛
 *       ┗━┓┓┏━━┳┓┏━┛
 *     　  ┃┫┫　┃┫┫
 *     　  ┗┻┛　┗┻┛
 *
 * ━━━━━━感觉萌萌哒━━━━━━
 */

// 请根据考试说明文档中列出的需求进行作答
// 预祝各位顺利通过本次考试，see you next week！
// ...

$(function(){

    bindDoing()
    function bindDoing () {
        const arr = JSON.parse(window.localStorage.getItem('doing')) || []
        if (!arr) {
            $('.demo-box').html('') 
            return
        }
        let str = ''
                for (let i = 0; i < arr.length; i++){
                    str += ` <li>
                                <input type="checkbox" />
                                <p>${ arr[i] }</p>
                                <a href="javascript:;">-</a>
                            </li>`
                }
                
            $('.demo-box').html(str)
            $('#todocount').text(arr.length)
    }
    
    bindDone()
    function bindDone () {
        const arr = JSON.parse(window.localStorage.getItem('done')) || []
        if (!arr) {
            $('#donelist').html('')
            return
        }
        let str = ''
        
        for (let i = 0; i < arr.length; i++) {
            str += `<li>
                        <input type="checkbox"/>
                        <p>${ arr[i] }</p>
                        <a href="javascript:;">-</a>
                    </li>`
        }
        $('#donecount').text(arr.length)
        $('#donelist').html(str)
    }

    $('form').on('keypress', 'input', function(e) {
            // console.log(e)
                if(e.keyCode === 13) {
                    e.preventDefault()
                    const res = $(this).val()
                    if (!res.trim()) return
                    $(this).val('')
                    const arr = JSON.parse(window.localStorage.getItem('doing')) || []
                    arr.push(res)
                    let str = ''
                    for (let i = 0; i < arr.length; i++){
                        str += ` <li>
                                    <input type="checkbox" />
                                    <p>${ arr[i] }</p>
                                    <a href="javascript:;">-</a>
                                </li>`
                    }
                    
                    $('.demo-box').html(str)
                    $('#todocount').text(arr.length)
                    window.localStorage.setItem('doing', JSON.stringify(arr))
                }
        })


    // 正在进行 复选框
    $('#todolist').on('click', 'input', function() {
        
        if (this.checked) {
            const arr = JSON.parse(window.localStorage.getItem('doing')) || []
            const arr1 = JSON.parse(window.localStorage.getItem('done')) || []
            for(let i = 0; i < arr.length; i++) {
                if (arr[i] === $(this).next().text()) {
                    const newArr = arr.splice(i, 1)
                    var conArr = arr1.concat(newArr)
                    break
                }
            }
            window.localStorage.setItem('doing', JSON.stringify(arr))
            window.localStorage.setItem('done', JSON.stringify(conArr))
            bindDoing()
            bindDone()
        }
    })

    // 正在进行 实时编辑
    edit('#todolist', 'doing')
    function edit(ele, key) {
        $(ele).on('click', 'p', function() {
            const value = $(this).text()
            let str = `<input type="text" value="${ value }" class="add" style="display: block; width: 502px; height:26px; margin-top: -2px; margin-left: 30px;">`
            $(this).replaceWith(str)
            
            $(ele).on('keypress', '.add', function(e) {
                if(e.keyCode === 13) {
                    const res = $(this).val()
                    if (!res.trim()) return
                    $(this).val('')
                    const arr = JSON.parse(window.localStorage.getItem(key)) || []
                    for(let j = 0; j < arr.length; j++) {
                        if(arr[j] === value) {
                            arr[j] = res
                            break
                        }
                    }

                    let str = ''
                    for (let i = 0; i < arr.length; i++){
                        str += ` <li>
                                    <input type="checkbox" />
                                    <p>${ arr[i] }</p>
                                    <a href="javascript:;">-</a>
                                </li>`
                    }
                    
                    $(ele).html(str)
                    window.localStorage.setItem(key, JSON.stringify(arr))
                    
                }
            })
        
        })
    }
    
   
    // 正在进行 删除
    $('#todolist').on('click', 'a', function() {
        const value = $(this).prev().text()
        const arr = JSON.parse(window.localStorage.getItem('doing')) || []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                arr.splice(i, 1)
                break
            }
        }

        window.localStorage.setItem('doing', JSON.stringify(arr))
        bindDoing()
    })


    // 已完成 实时编辑
    edit('#donelist', 'done')

    // 已完成 复选框
    $('#donelist').on('click', 'input', function() {
        if (this.checked) {
            const arr = JSON.parse(window.localStorage.getItem('doing')) || []
            const arr1 = JSON.parse(window.localStorage.getItem('done')) || []
            for(let i = 0; i < arr1.length; i++) {
                if (arr1[i] === $(this).next().text()) {
                    const newArr = arr1.splice(i, 1)
                    var conArr = arr.concat(newArr)
                    break
                }
            }
            window.localStorage.setItem('doing', JSON.stringify(conArr))
            window.localStorage.setItem('done', JSON.stringify(arr1))
            bindDoing()
            bindDone()
        }
    })

    // 已完成 删除
    $('#donelist').on('click', 'a', function() {
        const value = $(this).prev().text()
        const arr = JSON.parse(window.localStorage.getItem('done')) || []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === value) {
                arr.splice(i, 1)
                break
            }
        }
        window.localStorage.setItem('done', JSON.stringify(arr))
        bindDone()
    })


    $.get('/ks','', null, 'json')
    .then((res) => {
        $('#ipv4').text(res.ip)
        $('#addr').text(`${ res.country }`+` ${ res.area }`)
    })

})
