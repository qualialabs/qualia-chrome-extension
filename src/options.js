$(document)
  .ready(function() {

    var
      $options    = $('input[type="text"]'),
      $saveButton = $('button.save'),
      handler     = {}
    ;

    handler = {

      returnFalse: function() {
        return false;
      },

      options: {

        initialize: function() {
          chrome.storage.sync.get(null, function(settings){
            var
              defaults = {},
              settings = $.extend(true, {}, defaults, settings)
            ;
            $.each(settings, function(name, value) {
              var
                $input = $('input[name="' + name + '"]')
              ;
              if(name == 'deployment' && !value) {
                console.log('finding it');
                value = chrome.history.search({
                  text: '.qualia.io/home'
                }, function(matches){
                  $input.val(matches[0].url.split('//')[1].split('.')[0]);
                });
              }
              else {
                $input.val(value);
              }
            });
          });
        },

        changed: function() {
          $saveButton
            .removeClass('disabled')
          ;
        },

        save: function() {
          var
            options = {}
          ;

          $options
            .each(function() {
              var
                name  = $(this).attr('name'),
                value = $(this).val()
              ;
              options[name] = value;
            })
          ;
          chrome.storage.sync.set(options, function(settings) {
            handler.options.initialize();
          });
          return true;
        }
      }
    };

    handler.options.initialize();
    $options
      .on('change', handler.options.change)
    ;

    $saveButton
      .on('click', handler.options.save)
    ;

  })
;
