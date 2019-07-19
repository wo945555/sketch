var web_base_url = $('#baseurl').val();

$('input.tags').on('change', function(evt) {
    if($('input.tags:checked').length > 3) {
        this.checked = false;
        alert("您只能选择 "+3+" 个标签");
    }
});

$('input.alltags').on('change', function(evt) {
    if($('input.alltags:checked').length > 5) {
        this.checked = false;
        alert("您只能选择 "+5+" 个标签");
    }
});

function uncheckAll(divid) {
    $('#' + divid + ' :checkbox').prop('checked', false);
}
function checkAll(divid) {
    $('#' + divid + ' :checkbox').prop('checked', true);
}

function yuanchuang_checked(){
    $('.tongren' + ' :checkbox').prop('checked', false);
    $('.yuanchuang_block').removeClass('hidden');
    $('.tongren_block').addClass('hidden');
}

function tongren_checked(){
    $('.yuanchuang' + ' :checkbox').prop('checked', false);
    $('.tongren_block').removeClass('hidden');
    $('.yuanchuang_block').addClass('hidden');
}

function non_bianyuan_checked(){
    $('.bianyuan' + ':checkbox').prop('checked', false);
    $('.bianyuan_block').addClass('hidden');
}

function bianyuan_checked(){
    $('.bianyuan_block').removeClass('hidden');
}

function show_only_children_yuanzhu(id){
    $('.tongren_yuanzhu').addClass('hidden');
    $('.parent'+id).removeClass('hidden');
}
function show_only_children_CP(id){
    $('.tongren_CP').addClass('hidden');
    $('.parent'+id).removeClass('hidden');
}

function toggle_review_quote(quote_id, method){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'GET',
        url: web_base_url + '/quotes/' + quote_id + '/toggle_review/' + method,
        data: {
        },
        success: function(data) {
            if (data != "notwork"){
                console.log(data.approved);
                $( '.quotebutton'+quote_id ).addClass('hidden');
                $( '.quotereviewstatus'+quote_id ).html(data.approved);
            }else{
                console.log('having error approving/disaproving quote');
            }
        }
    });
};

function toggle_re_review_buttons(item_id,approve_status){//approve_status = 0:not approved; 1:approved
    if (approve_status === 1){
        $( '.disapprovebutton' +  item_id).removeClass('hidden');
    }else{
        $( '.approvebutton' +  item_id).removeClass('hidden');
    }
    $( '.togglebutton' +  item_id).addClass('hidden');
}



// function thread_xianyu(thread_id){
//     $.ajaxSetup({
//         headers: {
//             'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//         }
//     });
//     $.ajax({
//         type: 'GET',
//         url: web_base_url + '/threads/' + thread_id + '/xianyu',
//         data: {
//         },
//         success: function(data) {
//             console.log(data);
//             var message = ["success","info","warning","danger"];
//             $.each(data, function( key, value ){
//                 if ($.inArray(key,message)>-1){
//                     console.log(key,value);
//                     $( '#ajax-message' ).html(value).addClass('alert-'+key).removeClass('hidden');
//                 }
//             });
//             if(!(data['xianyu'] === undefined)){
//                 $( '#threadxianyu'+thread_id ).html('咸鱼'+data['xianyu']);
//             }
//         }
//     });
// };

function add_to_collection(thread_id){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: web_base_url + '/threads/' + thread_id + '/collect',
        data: {
        },
        success: function(data) {
            // console.log(data);
            var message = ["success","info","warning","danger"];
            $.each(data, function( key, value ){
                if ($.inArray(key,message)>-1){
                    console.log(key,value);
                    $( '#ajax-message' ).html(value).addClass('alert-'+key).removeClass('hidden');
                }
            });
            if(!(data['collection'] === undefined)){
                $( '#itemcollection'+thread_id ).html('已收藏');
            }
        }
    });
};

function cancel_collection(collection_id){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: web_base_url + '/collection/' + collection_id,
        data: {
            '_method': "DELETE",
        },
        success: function(data) {
            console.log(data);
            if(!(data['thread_id'] === undefined)){
                $( '.thread'+ data['thread_id'] ).addClass('hidden');
            }
        }
    });
};


function collection_toggle_keep_update(collection_id,keep_updated){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: web_base_url + '/collection/' + collection_id,
        data: {
            '_method': "PATCH",
            'keep_updated' : keep_updated,
        },
        success: function(data) {
            if (data != "notwork"){
                // console.log(data);
                if(!(data['collection'] === undefined)){
                    if(data['collection']['keep_updated']){
                        $( '#keepupdate'+collection_id ).addClass('hidden');
                        $( '#nomoreupdate'+collection_id ).removeClass('hidden');
                    }else{
                        $( '#keepupdate'+collection_id ).removeClass('hidden');
                        $( '#nomoreupdate'+collection_id ).addClass('hidden');
                    }
                }

            }
        }
    });
};

function collection_change_group(collection_id,group_id){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: web_base_url + '/collection/' + collection_id,
        data: {
            '_method': "PATCH",
            'group' : group_id,
        },
        success: function(data) {
            if (data != "notwork"){
                console.log(data);
                if(!(data['collection'] === undefined)){
                    if(data['collection']['group']){
                        $( '.thread'+ data['collection']['thread_id'] ).addClass('hidden');
                    }
                }

            }
        }
    });
};

function reward(rewardable_type, rewardable_id, reward_type, reward_value){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: web_base_url + '/reward/',
        data: {
            'rewardable_type': rewardable_type,
            'rewardable_id': rewardable_id,
            'reward_type': reward_type,
            'reward_value': reward_value,
        },
        success: function(data) {
            var message = ["success","info","warning","danger"];
            $.each(data, function( key, value ){
                if ($.inArray(key,message)>-1){
                    console.log(key,value);
                    $( '#ajax-message' ).html(value).addClass('alert-'+key).removeClass('hidden');
                }
            });
        }
    });
};

function delete_reward(reward_id){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: web_base_url + '/reward/' + reward_id,
        data: {
            '_method': "DELETE",
        },
        success: function(data) {
            // console.log(data);
            var message = ["success","info","warning","danger"];
            $.each(data, function( key, value ){
                if ($.inArray(key,message)>-1){
                    console.log(key,value);
                    $( '#ajax-message' ).html(value).addClass('alert-'+key).removeClass('hidden');
                }
            });
            if(!(data['reward_id'] === undefined)){
                $( '.reward'+ data['reward_id'] ).addClass('hidden');
            }
        }
    });
};

function vote(votable_type, votable_id, attitude_type){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: web_base_url + '/vote/',
        data: {
            'votable_type': votable_type,
            'votable_id': votable_id,
            'attitude_type': attitude_type,
        },
        success: function(data) {
            var message = ["success","info","warning","danger"];
            $.each(data, function( key, value ){
                if ($.inArray(key,message)>-1){
                    console.log(key,value);
                    $( '#ajax-message' ).html(value).addClass('alert-'+key).removeClass('hidden');
                }
            });
            if(!(data['success'] === undefined)){
                var value= parseInt($('#'+votable_type+votable_id+attitude_type).text(), 10)+1;
                $('#'+votable_type+votable_id+attitude_type).html(value);
            }

        }
    });
};

function delete_vote(vote_id){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: web_base_url + '/vote/' + vote_id,
        data: {
            '_method': "DELETE",
        },
        success: function(data) {
            // console.log(data);
            var message = ["success","info","warning","danger"];
            $.each(data, function( key, value ){
                if ($.inArray(key,message)>-1){
                    console.log(key,value);
                    $( '#ajax-message' ).html(value).addClass('alert-'+key).removeClass('hidden');
                }
            });
            if(!(data['vote_id'] === undefined)){
                $( '.vote'+ data['vote_id'] ).addClass('hidden');
            }
        }
    });
};


function replytopost(post_id, post_trim){
    document.getElementById("reply_to_id").value = post_id;
    document.getElementById("reply_to_post").classList.remove('hidden');
    document.getElementById("reply_to_post_info").innerHTML = '回复 ' + post_trim ;
};
function cancelreplytopost(){
    document.getElementById("reply_to_id").value = 0;
    document.getElementById("reply_to_post").classList.add('hidden');
    document.getElementById("reply_to_post_info").innerHTML = "";
};

function wordscount(item){
    var post = document.getElementById(item).value;
    var str = post.replace(/[\[\]\*\#\_\-\s\n\t\r]/g,"");
    alert("字数统计：" + str.length);
};
// function removespace(itemname){
//     var post = $('#'+itemname).val();
//     var res = post.split("\n");
//     var string = "";
//     $.each(res, function(key,value){
//         string += $.trim(value) + "\n"
//     });
//     console.log('cleared spaces');
//     $('#'+itemname).val(string);
// };

function expanditem(id){
    var x = document.getElementById('full'+id);
    var y = document.getElementById('abbreviated'+id);
    var z = document.getElementById('expand'+id);
    if (x.classList.contains('hidden')) {//这是一个缩过的，需要展开
        x.classList.remove('hidden');
        y.classList.add('hidden');
        z.innerHTML = '收起';
        z.classList.remove('pull-right');
        z.classList.add('text-center');
    } else {
        y.classList.remove('hidden');
        x.classList.add('hidden');
        z.innerHTML = '展开';
        z.classList.add('pull-right');
        z.classList.remove('text-center');
    }
};


function cancelfollow(user_id){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: "POST",
        url: web_base_url + '/users/followers/' +user_id,
        data: {
            '_method': "DELETE",
            'id': user_id,
        },
        success: function(data) {
            if (data != "notwork"){
                $( '.follow'+user_id ).removeClass('hidden');
                $( '.cancelfollow'+user_id ).addClass('hidden');
                $( '.followuser'+user_id ).addClass('hidden');
            }
        }
    });
};

function follow(user_id){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: web_base_url + '/users/followers/' +user_id,
        data: {
            'id': user_id
        },
        success: function(data) {
            if (data != "notwork"){
                $( '.follow'+user_id ).addClass('hidden');
                $( '.cancelfollow'+user_id ).removeClass('hidden');
            }
        }
    });
};
function deletepost(post_id){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: web_base_url + '/posts/' +post_id,
        data: {
            '_method': "DELETE",
            'id': post_id
        },
        success: function(data) {
            console.log(data);
            $( '#post'+post_id ).addClass('hidden');
        }
    });
}
function deletepostcomment(postcomment_id){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'POST',
        url: web_base_url + '/postcomments/' +postcomment_id,
        data: {
            '_method': "DELETE",
            'id': postcomment_id
        },
        success: function(data) {
            $( '#postcomment'+postcomment_id ).addClass('hidden');
        }
    });
}

function initcache(){
    console.log('goingto initiate cache');
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: "GET",
        url: web_base_url + '/cache/initcache',
        data: {
        },
        success: function(data) {
            if (data != "notwork"){
                console.log(data);
            }
        }
    });
};

$(document).ready(function(){
    $( 'textarea'  ).one( "click", function() {
        if($(this).attr('rows')>1){
            initcache();
        }
    });
});

$('textarea').keyup(debounce(function() {
    //console.log('save');
    item_value = $(this).val();
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: "POST",
        url: web_base_url + '/cache/save',
        data: {
            'item_value': item_value,
        },
        success: function(data) {
            if (data != "notwork"){
                //console.log(data);
            }
        }
    });
}, 2000));

function retrievecache(itemname){
    //console.log('going to retrieve cache');
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: "GET",
        url: web_base_url + '/cache/retrieve',
        data: {
        },
        success: function(data) {
            if (data != "notwork"){
                //console.log('cache retrieved');
                //console.log(data);
                $('#'+itemname).val(data);
            }else{
                //console.log('no cache retrieved');
            }
        }
    });
};
$(document).ready(function(){
    $('.dropdown-submenu a.dropdown-test').on("click", function(e){
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });
});

function cancellink(master_account, branch_account){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: "POST",
        url: web_base_url + '/linkedaccounts/destroy',
        data: {
            '_method': "DELETE",
            'master_account': master_account,
            'branch_account': branch_account
        },
        success: function(data) {
            var message = ["success","info","warning","danger"];
            $.each(data, function( key, value ){
                if ($.inArray(key,message)>-1){
                    console.log(key,value);
                    $( '#ajax-message' ).html(value).addClass('alert-'+key).removeClass('hidden');
                }
            });
            if(!(data['success'] === undefined)){
                $( '.linkedaccount'+master_account+'-'+branch_account ).addClass('hidden');
            }
        }
    });
};

function receivemessagesfromstrangers(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'GET',
        url: web_base_url + '/messages/receivemessagesfromstrangers',
        data: {
        },
        success: function(data) {
            if (data != "notwork"){
                $( '.receivemessagesfromstrangers').addClass('hidden');
                $( '.cancelreceivemessagesfromstrangers').removeClass('hidden');
            }
        }
    });
};
function cancelreceivemessagesfromstrangers(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'GET',
        url: web_base_url + '/messages/cancelreceivemessagesfromstrangers',
        data: {
        },
        success: function(data) {
            if (data != "notwork"){
                $( '.receivemessagesfromstrangers').removeClass('hidden');
                $( '.cancelreceivemessagesfromstrangers').addClass('hidden');
            }
        }
    });
};

function receiveupvotereminders(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'GET',
        url: web_base_url + '/messages/receiveupvotereminders',
        data: {
        },
        success: function(data) {
            if (data == "works"){
                $( '.receiveupvotereminders').addClass('hidden');
                $( '.cancelreceiveupvotereminders').removeClass('hidden');
            }
        }
    });
};
function cancelreceiveupvotereminders(){
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type: 'GET',
        url: web_base_url + '/messages/cancelreceiveupvotereminders',
        data: {
        },
        success: function(data) {
            if (data == "works"){
                $( '.receiveupvotereminders').removeClass('hidden');
                $( '.cancelreceiveupvotereminders').addClass('hidden');
            }
        }
    });
};
function sosadpretreat(string) {//将正常文本预处理
    string = string.replace(/\[br\]/g,"</p><br><p>");
    string = string.replace(/\r\n/g,"\n");
    string = string.replace(/\r/g,"\n");
    string = string.replace(/\n{1,}/g,"</p><p>");
    string = "<p>"+string+"</p>";
    string = string.replace(/<p><\/p>/g,"");
    return(string);
}
function doublebreakline(string) {//魔改md，使得单一换行能够显示
    string = string.replace(/\n/g,"<br>");
    return(string);
}

function addoption(thread_id){//让投票区增加分支选择项
    var option_number = $('#thread-'+thread_id+'-poll-options > input').length + 1;
    if (option_number<=10){
        $('#thread-'+thread_id+'-poll-options').append('<input type="text" name="option-'+option_number+'" class="form-control" id="thread-'+thread_id+'-poll-option-'+ option_number +'" placeholder="请填写选项'+option_number+'">');
        //console.log(option_number);
    }else{
        alert("只能填写十项");
    }
}

function toggle_tags(){
    $('.extra-tag').toggleClass('hidden');
}

// $(function() {
//
//     var $quote = $("#daily-quote");
//     console.log($quote);
//     var $numWords = $quote.text().length;
//     console.log($numWords);
//
//     if (($numWords >= 1) && ($numWords < 10)) {
//         $quote.css("font-size", "36px");
//     }
//     else if (($numWords >= 10) && ($numWords < 20)) {
//         $quote.css("font-size", "32px");
//     }
//     else if (($numWords >= 20) && ($numWords < 30)) {
//         $quote.css("font-size", "28px");
//     }
//     else if (($numWords >= 30) && ($numWords < 40)) {
//         $quote.css("font-size", "24px");
//     }
//     else {
//         $quote.css("font-size", "20px");
//     }
//
// });

$( ".daily-quote" ).each(function( quote ) {

    var $quote = $( this );
    var $quotestring = $quote.text();
    var $numWords = $quotestring.length;
    var $len = 0;
    for (var i=0; i<$numWords; i++) {
        if ($quotestring.charCodeAt(i)>127 || $quotestring.charCodeAt(i)==94) {
            $len += 2;
        } else {
            $len ++;
        }
    }
    //console.log(quote + ": " + $quotestring + ": " +$len);

    if (($len >= 1) && ($len < 10)) {
        $quote.css("font-size", "3.5em");
    }
    else if (($len >= 10) && ($len < 20)) {
        $quote.css("font-size", "3.0em");
    }
    else if (($len >= 20) && ($len < 40)) {//ok
        $quote.css("font-size", "2.5em");
    }
    else if (($len >= 40) && ($len < 80)) {
        $quote.css("font-size", "2.0em");
    }
    else if (($len >= 80) && ($len < 160)) {
        $quote.css("font-size", "1.5em");
    }
    else {
        $quote.css("font-size", "1em");
    }
});

// function show_book_selector(){
//     $('.detailed-selector').removeClass('hidden');
//     $('.detailed-selector input').attr('disabled', false);
//     $('.brief-selector').addClass('hidden');
//     $('.brief-selector input').attr('disabled', true);
// }
// function fold_book_selector(){
//     $('.brief-selector').removeClass('hidden');
//     $('.brief-selector input').attr('disabled', false);
//     $('.detailed-selector').addClass('hidden');
//     $('.detailed-selector input').attr('disabled', true);
// }
function toggle_tags_tongren_yuanzhu(){
    $('.tongren_yuanzhu').toggleClass('hidden');
}
