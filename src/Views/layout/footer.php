
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <script src="//cdn.datatables.net/2.0.5/js/dataTables.min.js"></script>
    <script src="/public/assets/js/ui-toasts.js"></script>
    <script src="/public/assets_two/mahasiswa/script.js?v=123"></script>
     <script>
    $('#mytabel').DataTable({
        "ordering": false
    });

    $('#mytabel2').DataTable({
        "ordering": false
    });
</script>
<?php getAlert('top-0 m-4 end-0', 'Sukses'); ?>
 <script>
  $(document).ready(function(){
  $('.toast-placement-ex').toast({delay: 1500});
      $('.toast-placement-ex').toast('show');
  });
</script>
  <?=implode('',$additionalCode ?? [])?>
  </body>
</html>