new Vue({
  el: "#app",
  data: {
    people: [
      { name: "Person A", status: "WFH", img:"https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png" },
      { name: "Person B", status: "Office", img:"https://www.cats.org.uk/media/1400/choosing-a-cat.jpg?width=1600" },
      { name: "Person C", status: "Holiday", img:"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/reference_guide/cats_and_excessive_meowing_ref_guide/1800x1200_cats_and_excessive_meowing_ref_guide.jpg" },
      { name: "Person D", status: "Holiday", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSNuDXUwo8Gn_oNUXOwUvlJFv2QjnFY22SWNszr9O2s6zj1XzQU" }
    ]
  },
  methods: {
  	toggle: function(todo){
    	todo.done = !todo.done
    }
  }
})