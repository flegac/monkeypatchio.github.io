var map;
jQuery(document).ready(function(){

    map = new GMaps({
        div: '#map',
        lat: 43.5518078,
        lng: 1.4895341,
    });
    map.addMarker({
        lat: 43.5518078,
        lng: 1.4895341,
        title: 'Address',      
        infoWindow: {
            content: '<h5 class="title">MonkeyPatch</h5><p><span class="region">12 avenue de l\'Europe, 31650 Ramonville-Saint-Agne</span><br><span class="postal-code">31670</span><br><span class="country-name">France</span></p>'
        }
        
    });

});