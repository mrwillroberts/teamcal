(function () {
    $.getJSON( "data.json", function( data ) {
      var day_headers = ["<th class=\"no-border\"/>"];
      var weekday_headers = ["<th class=\"no-border\"/>"];
      var membersDict = {};
      var eventTypeDict = {"support":"S", "holiday":"H"};
      date = new Date(data.start_date);
      endDate = new Date(data.end_date);

      $.each( data.members, function( index, val ) {
         var row_items = ["<th class=\"name\">"+val.name+"</th>"];
         membersDict[val.name] = row_items;
      });

      while (date <= endDate){
        dateString = toDateString(date);
        dayOfWeek = getDayOfWeek(date);
        isWeekend = isDateWeekend(date);

        if (!isWeekend){
            day_headers.push("<th class=\"date\">"+date.getUTCDate()+"</th>");
            weekday_headers.push("<th class=\"day\">"+dayOfWeek+"</th>");
            var items = [];
            $.each( data.members, function( index, val ) {
                event_type = "";
                if (val.events){
                    $.each(val.events, function( index, event) {
                        if (date >= new Date(event.start_date) && date <= new Date(event.end_date)) {
                            event_type = event.type;
                        }
                    });
                }
                cell = $("<td>",{html:eventTypeDict[event_type], class:event_type}).prop('outerHTML');;
                membersDict[val.name].push(cell);
            });
        } else {
            day_headers.push("<th class=\"date weekend\"/>");
            weekday_headers.push("<th class=\"day weekend\"/>");
            $.each( data.members, function( index, val ) {
                membersDict[val.name].push("<td class=\"weekend\">");
            });
        }
        date = addDays(date,1);

      }
        $( "<tr/>", { html: day_headers.join( "" ) }).appendTo( "#caltable" );
        $( "<tr/>", { html: weekday_headers.join( "" ) }).appendTo( "#caltable" );
        $.each( data.members, function( index, val ) {
            row=$( "<tr/>", {
                html: membersDict[val.name].join( "" )
             });
            row.appendTo( "#caltable" );
        });

    });

    function getDayOfWeek(date) {
      var dayOfWeek = date.getDay();
      return isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek];
    }


    function addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    function toDateString(date){
        return date.toISOString().split('T')[0]
    }

    function isDateWeekend(date){
        return date.getDay() == 0 || date.getDay() == 6;
    }
})();

