<template>
  <div class="jb-ranked">
    <div class="container">
      <h1 class="jb-ranked-title">Job board ranked</h1>
      <div v-if="!currentRegion" class="jb-ranked__regions">
        <div
          v-for="region of regions"
          :key="region.id"
          class="jb-ranked__regions-item"
          @click="$router.push(`/ranked_jb/${region.country}`)">
          {{ region.country }}
        </div>
      </div>

      <div v-else-if="ranked" class="jb-ranked-table-wrapper">
        <table class="jb-ranked-table">
          <thead>
            <tr>
              <td class="jb-ranked-table-item-td">№</td>
              <td class="">Job board</td>
              <td class="jb-ranked-table-item-td">SQL</td>
              <td class="jb-ranked-table-item-td">Frontend</td>
              <td class="jb-ranked-table-item-td">Python</td>
              <td class="jb-ranked-table-item-td">Суммарно</td>
            </tr>
          </thead>
          <tr
            v-for="(item, index) of ranked"
            :key="item.id"
            class="jb-ranked-table-item">
            <td class="jb-ranked-table-item-td">{{ index + 1 }}</td>
            <td class="jb-ranked-table-item-td jb-ranked-table-item-td_flex">
              <img
                class="jb-ranked-table-item-logo"
                :src="getLogoIcon(item.job_board)"
                alt="" />
              <a :href="`https://${item.url}`" class="jb-ranked-table-link">
                {{ item.job_board }}
              </a>
            </td>
            <td class="jb-ranked-table-item-td">{{ item.counts.SQL }}</td>
            <td class="jb-ranked-table-item-td">{{ item.counts.Frontend }}</td>
            <td class="jb-ranked-table-item-td">{{ item.counts.Python }}</td>
            <td class="jb-ranked-table-item-td">{{ item.counts.total }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api.js'

export default {
  data() {
    return {
      currentRegion: null,
      ranked: null,
      regions: [
        'Russia',
        'USA',
        'UK',
        'Brazil',
        'India',
        'Germany',
        'Canada',
        'France',
        'Poland',
        'Netherlands',
        'Australia',
        'Spain',
        'Japan',
        'China',
      ],
    }
  },

  computed: {
    routeQ() {
      return this.$route.params.id
    },
  },

  watch: {
    routeQ(v) {
      if (v) {
        this.showRegionJobBoard(v)
      } else {
        this.currentRegion = null
      }
    },
  },

  async mounted() {
    this.regions = await api.getRegions()
    if (this.$route.params.id) this.showRegionJobBoard(this.$route.params.id)
  },
  methods: {
    getLogoIcon(jobBoardName) {
      try {
        return require(`../../../../public/jobboards/${jobBoardName}.svg`)
      } catch {
        return require(`../../../../public/jobboards/No-logo.svg`)
      }
    },
    async showRegionJobBoard(region) {
      let currentRegionId
      this.ranked = null
      for (const regionItem of this.regions) {
        if (regionItem.country === region) {
          currentRegionId = regionItem.id
          break
        }
      }
      console.log(currentRegionId)
      this.currentRegion = region
      this.$router.push(`/ranked_jb/${region}`)
      this.ranked = await api.getRankedJobBoardOfRegion(currentRegionId)
      // this.ranked = [
      //   {
      //     id: 1,
      //     jobBoard: 'Indeed',
      //     linkExample: 'https://indeed.de',
      //     counts: { SQL: 1000, Frontend: 2000, Python: 1300 },

      //     // id    jb   region      linkEx
      //     // 1     1      2         https://

      //     // id   date   SQL    Frontend  Python    All
      //     // 1     2015   1       1         100     1329
      //     //
      //     //
      //     //
      //     //
      //   },
      //   {
      //     id: 2,
      //     jobBoard: 'LinkedIn',
      //     linkExample: 'https://LinkedIn.com',
      //     counts: { SQL: 100, Frontend: 200, Python: 130 },
      //   },
      //   {
      //     id: 3,
      //     jobBoard: 'Glassdoor',
      //     linkExample: 'https://LinkedIn.com',
      //     counts: { SQL: 100, Frontend: 200, Python: 130 },
      //   },
      // ]
    },
  },
}
</script>

<style>
.jb-ranked-title {
  /* width: 300px; */
}
.jb-ranked__regions {
  display: flex;
  flex-wrap: wrap;
}
.jb-ranked__regions-item {
  display: inline-block;
  padding: 16px;
  margin: 12px;
  cursor: pointer;
  border: 1px solid var(--color-gray);
  border-radius: 5px;
  transition: 0.3s;
}
.jb-ranked__regions-item:hover {
  opacity: 0.7;
  transition: 0.3s;
}
.jb-ranked-table-wrapper {
  overflow-x: auto;
}
.jb-ranked-table {
  width: 100%;
  max-width: 770px;
  font-size: var(--text-large);
  border-spacing: 20px 20px;
  border-collapse: separate;
}
.jb-ranked-table-item {
  /* display: flex;
  align-items: center; */
  /* gap: 15px; */
}
.jb-ranked-table-item-logo {
  width: 48px;
  height: 48px;
}
.jb-ranked-table-link {
  border-bottom: 1px solid var(--color-primary);
}
.jb-ranked-table-item-td {
  text-align: center;
}
.jb-ranked-table-item-td_flex {
  display: flex;
  gap: 5px;
  align-items: center;
}
</style>
