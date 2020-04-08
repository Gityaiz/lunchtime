<template>
  <v-layout row justify-center align-center>
    <GmapMap
      :center="{lat: map.center.lat, lng: map.center.lng}"
      :zoom="map.zoom"
      @click="clickedOnMap($event)"
      :style="map.style"
      map-type-id="terrain"
    >
      <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        {{ infoText }}
      </GmapInfoWindow>
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="toggleInfoWindow"
      />
    </GmapMap>
  </v-layout>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'
export default {
  props: {
    markers: {
      type: Array,
      default: () => ([
        { position: { lat: 35.658584, lng: 139.7454316 }, info: 'merker no info' }
      ])
    },
    map: {
      type: Object,
      default: () => ({
        center: { lat: 35.658584, lng: 139.7454316 },
        zoom: 15,
        style: 'width: 100vw; height: 80vh'
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
      infoText: null
    }
  },
  computed: {
    google: gmapApi
  },
  methods: {
    toggleInfoWindow (marker) {
      // TODO 取得したPinの位置情報にあるお店情報を取得する。（ページロード時に取得しておいて、ページコンポーネント側で表示するのかも？
      this.infoWindowPos = marker.position
      this.infoWinOpen = true
      this.infoText = marker.info
      this.$emit('clickedOnMap', { lat: marker.latLng.lat(), lng: marker.latLng.lng() })
    },
    clickedOnMap (event) {
      this.markers.push({
        position: { lat: event.latLng.lat(), lng: event.latLng.lng(), info: '' }
      })
      this.$emit('clickedOnMap', { lat: event.latLng.lat(), lng: event.latLng.lng() })
    }
  }
}
</script>
