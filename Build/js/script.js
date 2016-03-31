   var btn = document.getElementById('btn');
   var btn2 = document.getElementById('btn2');

   btn.addEventListener('click', function () {
       modalDialog.open({
           content: 'Hello this is just a modal.',
           verify: true,
           confirmText: 'Okay Success',
           confirm: function () {
               alert('success callback');
               modalDialog.close();

           },
           cancelText: 'Just Close',
           cancel: function () {
               alert('cancel callback');
               modalDialog.close();
           },
           width: '300px',
           animate: 'zoom'
       });
   });

   btn2.addEventListener('click', function () {
       modalDialog.open({
           content: 'This is the second modal.',
           width: 'auto',
           alert: true,
           alertCallback: function () {
               modalDialog.close();
           },
           animate: 'zoom'
       });
   });