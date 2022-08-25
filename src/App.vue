<template>
  <div>
    <App-Other />
    <App-Header />
    <App-Rating />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppRating from './components/AppRating.vue';
import AppOther from './components/AppOther.vue';

export default {
  components: { AppHeader, AppRating, AppOther },
};
</script>

<style>

/* 
.title {
}
.header__logo-text {
}
.filter {
}
.filter__item {
}
.list {
}
.list__item {
}
.list__item-img {
}
.list__item-title {
}
.list__item-category {
}
.list__item-count {
}
.list__item-chart {
}

.category {
  display: flex;
  width: 100%;
}

.category span {
  width: 25%;
}

.category1 {
  background: #ff00ff;
}
.category2 {
  background: #ffff00;
}
.category3 {
  background: #ff9900;
}
.category4 {
  background: #ea4335;
}
.category5 {
  background: #00ff00;
}
.category6 {
  background: #00ffff;
}
.category7 {
  background: #b6d7a8;
}
.category8 {
  background: #46bdc6;
}
.category9 {
  background: #9900ff;
}
.category10 {
  background: #a4c2f4;
}
.category11 {
  background: #34a853;
}
.category12 {
  background: #3d85c6;
}
.category13 {
  background: #ead1dc;
}
.category14 {
  background: #f3f3f3;
}
.category15 {
  background: #cccccc;
} */
</style>
