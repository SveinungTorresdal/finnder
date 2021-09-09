<div id="map" />

<script>
	import { finn, loading } from '../store'

	$: marker = !!map ? initMarker() : null
	$: map = !$loading ? initMap() : null
	$: setMarker($finn)
	

	function initMarker () {
		return new google.maps.Marker({
			map: map,
		})
	}

	function initMap () {
		return new google.maps.Map(document.getElementById("map"), {
			center: {
				lat: 59.90996439340482,
				lng: 10.741734174205012
			},
			fullscreenControl: false,
			mapId: '540ae4723420088d',
			streetViewControl: false,
			zoom: 14
		})
	}

	function setMarker (finn) {
		if (!map || !marker) { return }

		map.setCenter(finn.location)
		marker.setPosition(finn.location)
	}
</script>