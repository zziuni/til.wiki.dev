// console.log('loaded custom.js', $("#wiki-toc-main"));

$(document).ready(function(){
    //for TOC
    var toc = $("#wiki-toc-main")
                    .clone()
                    .attr("id", "fixed-toc-main")
                    .addClass("toogle-default");
    toc.appendTo("body");

    //Event Listener for clicking TOC next to contents
    $("#fixed-toc-main").on("click", function( evt ){
        var toc = $(evt.currentTarget);

        if( toc.hasClass('toogle-default') ){
            toc.removeClass("toogle-default toggle-off");
            toc.addClass("toggle-on");
        }else{
            toc.removeClass("toggle-on");
            toc.addClass("toogle-default toggle-off");
        }
    });

    //Event Listener for smoothly scrolling
    $(':header a, .toc a').on("click", function( evt ){
        evt.preventDefault();
        var target = $( "a[id='" + $.attr(this, 'href').substr(1) + "']" );
        var headerOffset = parseInt( $("#wiki-wrapper.page").css("margin-top"), 10 );
        headerOffset += 10;

        if( !target[0] ){
            target = $("body");
        }

        $('html, body').animate({
            scrollTop: target.offset().top-headerOffset
        }, 500);
        // return false;
    });

    $('a[href^=http]').attr('target', '_blank');
})