<template>
  <div>
    <Header />
    <div id="Detail">
      <div id="containerDetail">
        <div id="movieDetail">
          <div id="iconsContainer">
            <div id="starIcon">
              <v-icon name="star" scale="1.2" color="#e50931" />
              <v-icon name="star" scale="1.2" color="#e50931" />
              <v-icon name="star" scale="1.2" color="#e50931" />
              <v-icon name="star" scale="1.2" color="#e50931" />
              <v-icon name="star" scale="1.2" color="#e50931" />
            </div>
            <div id="trailerIcon">
              <p>Watch trailer</p>
              <v-icon name="ticket-alt" scale="1.8" color="#e5e5e5" />
            </div>
          </div>
          <div id="videoContainer">
            <youtube :video-id="this.trailerID" ref="youtube"></youtube>
          </div>
        </div>
        <div id="descriptionsContainer">
          <div id="movieTitle">
            <h1>{{ movie.Title }}</h1>
          </div>
          <div id="spinnerLoading">
            <div v-show="showLoading" id="loadingSpinner">
              <Spinner />
            </div>
          </div>
          <div id="movieSynopsis">
            <p>{{ movie.Plot }}</p>
          </div>
          <button id="myList" v-on:click="addToMyList">
            Add to my list
            <v-icon name="list-ul" scale="1.2" color="#e5e5e5" id="playIcon" />
          </button>
          <div id="descriptions">
            <p>
              Duration
              <span>{{ movie.Runtime }}</span>
            </p>
            <p>
              Genre
              <span>{{ movie.Genre }}</span>
            </p>
            <p>
              Director
              <span>{{ movie.Director }}</span>
            </p>

            <p>
              Actors
              <span>{{ movie.Actors }}</span>
            </p>
            <p>
              Award
              <span>{{ movie.Awards }}</span>
            </p>
            <p>
              Production
              <span>{{ movie.Production }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import { Movies } from "../services/api";
import Icon from "vue-awesome/components/Icon";
import { Trailer } from "../services/trailer";
import Spinner from "../components/Spinner";

export default {
  name: "Detail",
  data() {
    return {
      movie: [],
      showLoading: true,
      trailerID: ""
    };
  },
  components: {
    Header,
    Spinner,
    "v-icon": Icon
  },

  async mounted() {
    this.showLoading = true;
    try {
      const response = await Movies(`i=${this.$route.params.id}`).get();
      this.movie = response.data;
      const responseTrailer = await Trailer(`${this.movie.Title}`).get();
      this.trailerID = responseTrailer.data.items[0].id.videoId;
    } catch (error) {
      console.log(error);
    } finally {
      this.showLoading = false;
    }
  },
  methods: {
    addToMyList() {
      this.$store.commit("addToMyList", this.movie);
      this.showToast();
    },
    showToast() {
      this.$toast.open({
        message: "Added to my list",
        type: "success",
        duration: 5000,
        dismissible: true,
        queue: true,
        position: "top-right"
      });
    }
  }
};
</script>

<style>
#Detail {
  display: flex;
  justify-content: center;
  align-items: center;
}
iframe {
  width: 100%;
  max-width: 650px;
}
#containerDetail {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#rateContainer {
  width: 100%;
}
#rateNumber {
  color: #e9e9e9;
  font-size: 17px;
  border: 2px solid white;
  background-color: rgb(255, 196, 0);
  border-radius: 10px;
  width: 45px;
  height: 45px;
  display: flex;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.iconStyles {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}
#myList {
  background: #ff142d;
  border-radius: 25px;
  text-decoration: none;
  text-align: center;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  border: none;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s;
  margin-bottom: 30px;
}
#myList:hover {
  transform: scale(1.2);
  cursor: pointer;
  background: #c20b1d;
}
#playIcon {
  margin-left: 10px;
}
#movieDetail {
  display: flex;
  flex-direction: column;
  width: 45%;
  justify-content: space-around;
}
#movieDetail p {
  color: #e9e9e9;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  text-align: justify;
}
#descriptionsContainer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
}
#descriptionsContainer h1 {
  color: #ffffff;
  text-shadow: black 0.1em 0.1em 0.2em;
  font-size: 35px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
}
#descriptions {
  border-radius: 20px;
  width: 90%;
  height: 38%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
}
#descriptions span {
  color: #969696;
}
#descriptions p {
  color: #ffffff;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  text-align: justify;
  text-shadow: black 0.1em 0.1em 0.2em;
  font-weight: bold;
  margin-bottom: 15px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  text-align: center;
}
#iconsContainer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #e9e9e9;
}
#iconsContainer p {
  margin-right: 10px;
  color: #e9e9e9;
  font-weight: bold;
}
#trailerIcon {
  display: flex;
  justify-content: center;
  align-items: center;
}
#trailerIcon p {
  text-align: center;
}
#movieTitle {
  width: 58%;
  text-align: center;
}
#movieSynopsis {
  color: #e9e9e9;
  font-family: arial;
  font-size: 14px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  text-align: justify;
  text-shadow: black 0.1em 0.1em 0.2em;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-direction: column;
  text-align: center;
  width: 60%;
}
p span {
  font-weight: 100;
  font-size: 14px;
  padding-top: 10px;
}
@media only screen and (max-width: 699px) {
  iframe {
    height: 200px;
  }
}
@media only screen and (max-width: 450px) {
  #descriptions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }
}
@media only screen and (max-width: 566px) {
  #iconsContainer {
    display: flex;
    flex-direction: column;
  }
  #starIcon {
    display: flex;

    width: 100%;
  }
  #trailerIcon {
    display: flex;

    width: 100%;
    justify-content: flex-end;
  }
}
</style>
