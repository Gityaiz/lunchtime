<template>
  <GmapMap
    :center="{lat: map.center.lat, lng: map.center.lng}"
    :zoom="map.zoom"
    @click="clickedOnMap($event)"
    :style="map.style"
    :draggable="true"
    map-type-id="terrain"
  >
    <GmapInfoWindow
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen=false"
    >
      <p style="color: black">
        {{ infoText }}
      </p>
    </GmapInfoWindow>
    <GmapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      @click="clickedOnMarker"
    />
    <GmapMarker
      :v-if="activeMarker!={}"
      :position="activeMarker.position"
    />
  </GmapMap>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
export default {
  props: {
    markers: {
      type: Array,
      default: () => ([
        {
          name: 'blank',
          position: { lat: 35.658584, lng: 139.7454316 },
          info: []
        }
      ])
    },
    map: {
      type: Object,
      default: () => ({
        center: { lat: 35.658584, lng: 139.7454316 },
        zoom: 15,
        style: 'width: 100vw; height: 100vh'
      })
    }
  },
  data () {
    return {
      infoWindowPos: null, // 場所
      infoWinOpen: false, // 表示フラグ
      infoOptions: { // マーカー表示オプション
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoText: null,
      activeMarker: {}
    }
  },
  computed: {
    google: gmapApi,
    fullScreen: () => ('width: 100vw; height: 100vh')
  },
  methods: {
    clickedOnMarker (marker) {
      // 渡されるmarkerはライブラリからの戻り値でmarkersに入っているオブジェクトとは異なるので
      // markersの中から該当するオブジェクトを検索する
      const clickedStore = this.markers.find(item =>
        item.position.lat === marker.latLng.lat() && item.position.lng === marker.latLng.lng()
      )
      this.infoWindowPos = clickedStore.position
      this.infoWinOpen = true
      this.infoText = clickedStore.name
      this.$emit('clickedMarker', clickedStore)
    },
    clickedOnMap (event) {
      // フルスクリーン状態でない場合でクリックされたときはフルスクリーンに変更するのみ
      if (this.map.style !== this.fullScreen) {
        this.map.style = this.fullScreen
        return
      }
      this.activeMarker = { position: { lat: event.latLng.lat(), lng: event.latLng.lng() } }
      this.$emit('clickedOnMap', { lat: event.latLng.lat(), lng: event.latLng.lng() })
    }
  }
}
</script>
