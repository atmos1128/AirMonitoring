Vue.component('cards', {
  template: '#cardsTemplate',
  props: {
    cardsData:{},
  },
  computed:{
    cardHeaderColor: function(){
      let classColor;
      switch(this.cardsData.Status){
        case '普通':
          classColor = 'header-status-aqi2'
          break;
         case '對敏感族群不健康':
          classColor = 'header-status-aqi3'
          break;
         case '對所有族群不健康':
          classColor = 'header-status-aqi4'
          break;
         case '非常不健康':
          classColor = 'header-status-aqi5'
          break;
         case '危害':
          classColor = 'header-status-aqi6'
          break;
         default:
          classColor = ''
          break;
      }
      return classColor
    },
    cardBodyColor: function(){
      let classColor;
      switch(this.cardsData.Status){
        case '普通':
          classColor = 'body-status-aqi2'
          break;
         case '對敏感族群不健康':
          classColor = 'body-status-aqi3'
          break;
         case '對所有族群不健康':
          classColor = 'body-status-aqi4'
          break;
         case '非常不健康':
          classColor = 'body-status-aqi5'
          break;
         case '危害':
          classColor = 'body-status-aqi6'
          break;
         default:
          classColor = ''
          break;
      }
      return classColor
    },
  },
  methods:{
    outadd(){
     this.$emit('change',this.cardsData)
    },
  }
});

var app = new Vue({
  el: '#app',
  data: {
    data: [],
    location: [],
    stared: JSON.parse(localStorage.getItem('cardsData')) || [],
    filter: 'all',
  },
  created: function() {
	  this.getData()
	},
  computed:{
    filterCounty:function(){
        if(this.filter == 'all'){
          return this.data;
        }else{
          return this.data.filter(item=>{
             return item.County === this.filter
          })
        }
    },
    cardColor: function(){
      let classColor;
      switch(this.filterCounty.Status){
        case '普通':
          classColor = 'status-aqi2'
          break;
         case '對敏感族群不健康':
          classColor = 'status-aqi3'
          break;
         case '對所有族群不健康':
          classColor = 'status-aqi4'
          break;
         case '非常不健康':
          classColor = 'status-aqi5'
          break;
         case '危害':
          classColor = 'status-aqi6'
          break;
         default:
          classColor = ''
          break;
      }
      return classColor
    },
  },
  methods: {
    getData() {
      const vm = this;
      const api = 'https://cors-anywhere.herokuapp.com/http://opendata2.epa.gov.tw/AQI.json';
      
      // 使用 jQuery ajax
      $.get(api).then(function( response ) {
        vm.data = response;
        // console.log(response)
        
        vm.data.forEach(item => {
          if(vm.data.indexOf(item.County) === -1){
            vm.location.push(item.County)
          }
        })
        
        vm.location = vm.location.filter(function(element, index, arr){
          return arr.indexOf(element) === index;
        });
      });
    },
    add(focusItem){
      var vm = this
      vm.stared.push(focusItem);
       var index = this.filterCounty.findIndex(item=>{
        return focusItem.SiteName == item.SiteName
      })
      this.filterCounty.splice(index,1)
      localStorage.setItem('cardsData', JSON.stringify(vm.stared));
    },
    remove(focusItem){
      var vm = this
      vm.filterCounty.push(focusItem);
      var index = this.stared.findIndex(item=>{
        return focusItem.SiteName == item.SiteName
      })
      this.stared.splice(index,1)
      localStorage.setItem('cardsData', JSON.stringify(vm.stared));
    }
  }
});