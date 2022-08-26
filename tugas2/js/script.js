lozad('.lazyload', {
    load: function(el) {
        console.log(el.dataset)
        el.src = el.dataset.src;
    }
}).observe();