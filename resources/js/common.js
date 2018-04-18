$(document).ready(function(){
    setTimeout(function photo() {
        $(".photo").addClass('active');
    }, 1000);
    
    if ($(window).innerWidth() > 1200) {
        var $elem = $(".date_list, .date_list li, .contacts");
        var in_view = new Waypoint.Inview({
            element: $elem,
            enter: function () {
                $elem.addClass('in-view');
            },
            exit: function () {  // optionally
                $elem.removeClass('in-view');
            }
        });
    }
});

