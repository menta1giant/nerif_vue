<template>
  <v-section responsive>
    <img src="@/assets/images/ron.webp"/>
  </v-section>
</template>

<script>
import { setMetaData } from '@/lib/meta';

export default {
  name: 'LegalView',
  created() {
    setMetaData({ 
      title: 'Dashboards',
      description: 'Dashboards page, concise analysis of Nerif\'s algorithm performance.'
    })
  },
}
</script>