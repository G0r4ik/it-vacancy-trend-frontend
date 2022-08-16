<template>
  <div>
    <App-Header />
    <App-Categories />
    <!-- <main class="main">
      <div class="container">
        <h2 class="title">Рейтинг</h2>
        <div class="filter">
          <select class="filter__item" name="date" id="date">
            <option value="1">1</option>
            <option value="1">1</option>
            <option value="1">1</option>
            <option value="1">1</option>
          </select>
          <select class="filter__item" name="tools" id="tools">
            <option value="1">1</option>
            <option value="1">1</option>
            <option value="1">1</option>
            <option value="1">1</option>
          </select>
          <select class="filter__item" name="display" id="display">
            <option value="1">1</option>
            <option value="1">1</option>
            <option value="1">1</option>
            <option value="1">1</option>
          </select>
          <select class="filter__item" name="sort" id="sort">
            <option value="Indeed">Indeed</option>
            <option value="HHRU">HHRU</option>
          </select>
        </div>
        <ol class="list">
          <li class="list__item">
            <span class="list__item-img">img</span>
            <span class="list__item-title">JavaScript</span>
            <span class="list__item-category">Language</span>
            <span class="list__item-count">10509</span>
            <span class="list__item-count">590</span>
            <span class="list__item-chart">___</span>
          </li>
          <li class="list__item">
            <span class="list__item-img">img</span>
            <span class="list__item-title">JavaScript</span>
            <span class="list__item-category">Language</span>
            <span class="list__item-count">10509</span>
            <span class="list__item-count">590</span>
            <span class="list__item-chart">___</span>
          </li>
          <li class="list__item">
            <span class="list__item-img">img</span>
            <span class="list__item-title">JavaScript</span>
            <span class="list__item-category">Language</span>
            <span class="list__item-count">10509</span>
            <span class="list__item-count">590</span>
            <span class="list__item-chart">___</span>
          </li>
        </ol>
      </div>
    </main> -->
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue';
import AppCategories from './components/AppCategories.vue';

export default {
  components: { AppHeader, AppCategories },
};
</script>

<style></style>
