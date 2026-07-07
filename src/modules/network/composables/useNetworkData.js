import { ref, onMounted } from 'vue'
import { fetchNetworkGraph } from '../../../core/api/apiClient.js'
import { logger } from '../../../core/logger/index.js'

export function useNetworkData() {
  const nodes = ref([])
  const links = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function load() {
    loading.value = true
    try {
      const data = await fetchNetworkGraph()
      nodes.value = data.nodes
      links.value = data.links
      categories.value = data.categories
    } catch (e) {
      error.value = e.message
      logger.error('useNetworkData.load failed', e)
    } finally {
      loading.value = false
    }
  }

  onMounted(load)
  return { nodes, links, categories, loading, error }
}
