<!-- <template>
  <TheHeader />
  <AuthSignIn
    v-if="component === 'login'"
    @change-component="changeComponent" />
  <AuthSignUp v-else @change-component="changeComponent" />
</template>

<script>
import { AuthSignIn, AuthSignUp } from '@/features/AuthUser'

export default {
  components: { AuthSignIn, AuthSignUp },

  data() {
    return {
      component: 'login',
    }
  },
  methods: {
    changeComponent(component) {
      this.component = component
    },
  },
}
</script> -->
