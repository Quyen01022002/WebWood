const numberInput = document.querySelector('.product-quantity__input')

numberInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
})

// Card Slider similar product
$(document).ready(function () {
    var multipleCardCarousel = document.querySelector("#carouselSimilarProduct");

    var carousel = new bootstrap.Carousel(multipleCardCarousel, {
        interval: false,
        wrap: false
    });

    var carouselWidth = $(".carousel-inner")[0].scrollWidth;
    var cardWidth = $(".carousel-item").width();
    var numVisibleCards = 1.75;
    var scrollPosition = 0;

    $("#carouselSimilarProduct .carousel-control-prev").addClass('disabled')

    if (window.matchMedia("(min-width: 900px)").matches) {
        numVisibleCards = 4;
    }

    $("#carouselSimilarProduct .carousel-control-next").on("click", function () {
        if (scrollPosition < carouselWidth - cardWidth * numVisibleCards) {
            scrollPosition += cardWidth;
            $("#carouselSimilarProduct .carousel-inner").animate(
                { scrollLeft: scrollPosition },
                600
            );
            if (scrollPosition > 0) {
                $("#carouselSimilarProduct .carousel-control-prev").removeClass('disabled');
            }
            if (scrollPosition > carouselWidth - cardWidth * numVisibleCards) {
                $("#carouselSimilarProduct .carousel-control-next").addClass('disabled');
            }
        }
    });

    $("#carouselSimilarProduct .carousel-control-prev").on("click", function () {
        if (scrollPosition > 0) {
            scrollPosition -= cardWidth;
            $("#carouselSimilarProduct .carousel-inner").animate(
                { scrollLeft: scrollPosition },
                600
            );
            if (scrollPosition <= 0) {
                $("#carouselSimilarProduct .carousel-control-prev").addClass('disabled')
            }
            if (scrollPosition < carouselWidth - cardWidth * numVisibleCards) {
                $("#carouselSimilarProduct .carousel-control-next").removeClass('disabled')
            }
        }
    });
});
