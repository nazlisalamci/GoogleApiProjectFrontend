<template>
  <v-main>
    <v-card>
      <v-row v-show="isDatabase!=null" no-gutters>
        <v-alert v-if="isDatabase==true"  text="Bu kordinat bilgisi databaseden gelmiştir"></v-alert>
        <v-alert v-else  text="Bu kordinat bilgisi databaseden gelmemiştir."></v-alert>
      </v-row>
      <v-row no-gutters>
        <v-select 
          v-model="model"
          label="Select"
          item-title="text"
          item-value="center"
          :items=items
          @change="changeCenter"
        ></v-select>
      </v-row>
      <v-row no-gutters>
        <v-col cols="3 "
          ><v-text-field
            v-model="latitude"
            label="latitude"
            outlined
            clearable
            type="number"
          ></v-text-field
        ></v-col>
        <v-col cols="3 offset-1">
          <v-text-field
            v-model="longitude"
            label="longitude"
            outlined
            clearable
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="3 offset-1">
          <v-text-field
            v-model="radius"
            label="radius"
            outlined
            clearable
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters class="d-flex justify-center align-center">
        <v-btn color="indigo-darken-3" @click="postins()">Search</v-btn>
      </v-row>
    </v-card>

    <v-card class="d-flex justify-center align-center mt-5">
      <GoogleMap
        id="GoogleMapId"
        api-key="AIzaSyCg2-A6lzPwvHBij9kNCKdDYYNZrjy6n3s"
        style="width: 80%; height: 300px"
        :center="centerComputed"
        :zoom="15"
      >
        <Marker :options="{ position: centerComputed }" />
      </GoogleMap>
    </v-card>
  </v-main>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
export default defineComponent({
  components: { GoogleMap, Marker },
  data() {
    return {
      latitude: null,
      longitude: null,
      radius: null,
      isDatabase:null,
      center: { lat: 51.1657, lng: 10.4515 },
      model:{
              text: 'Almanya',
              lat: '51.1657',
              lng: '10.4515',
            },
      items:[
            {
              text: 'Almanya',
             center: {
              lat: '51.1657',
              lng: '10.4515',
             }
              
            },
            {
              text: 'Türkiye',
              center: {
              lat: '41.0082',
              lng: '28.9784',}
            },
            {
              text: 'Hindistan',
              center:{
              lat: '28.6139',
              lng: '77.209',}
            },
            {
              text: 'Amerika',
              center:{
              lat: '40.7128',
              lng: '-74.006',}
            },
          ]
    };
  },
  watch:{
    model:{
      handler(val){
        console.log("watch");
        this.latitude=val.lat;
        this.longitude=val.lng
        this.radius=500
        this.postins();
      },deep:true
    }
  },
  computed: {
    centerComputed() {
      return { lat: this.center.lat, lng: this.center.lng };
    },
  },
  methods: {
 
    async postins() {
      try {
        const response = await this.axios
          .post("http://localhost:8070/api/2.0/place", {
            latitude: this.latitude,
            longitude: this.longitude,
            radius: this.radius,
          })
          .then((res) => {
            this.isDatabase=res.data.isDatabase;
            this.center.lat = res.data.latitude;
            this.center.lng = res.data.longitude;
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>

<style>
</style>
