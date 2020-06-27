$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       　　`<div class="main_chat_list__title">
            <div class="main_chat_list__title__name">
              ${message.user_name}
            </div>
            <div class="main_chat_list__title__time">
              ${message.created_at}
            </div>
          </div>
          <div class="main_chat_list__content">
            <p class="main_chat_list__content__one">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >`
      return html;
    } else {
      var html =
       　`<div class="main_chat_list__title">
            <div class="main_chat_list__title__name">
              ${message.user_name}
            </div>
            <div class="main_chat_list__title__time">
              ${message.created_at}
            </div>
          </div>
          <div class="main_chat_list__content">
            <p class="main_chat_list__content__one">
              ${message.content}
            </p>
          </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_chat_list').append(html);
      $('form')[0].reset();
      $('.main_chat_list').animate({ scrollTop: $('.main_chat_list')[0].scrollHeight});
      //$('.form__submit').prop('disabled', false);//
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
    return false;
  });

});