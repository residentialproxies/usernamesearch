import {
  EXPORT_FILENAMES,
  EXPORT_CONTENT,
  SHARE_URL,
  MARKDOWN_TEMPLATE,
  APP_INFO,
} from '@/lib/config'

interface SearchResult {
  url: string
  source: string
  isExist: boolean
  category?: string
}

export interface ExportData {
  username: string
  timestamp: string
  totalChecked: number
  totalAvailable: number
  totalTaken: number
  results: SearchResult[]
}

/**
 * Export search results as JSON
 */
export function exportAsJSON(data: ExportData): void {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = EXPORT_FILENAMES.JSON(data.username)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Export search results as CSV
 */
export function exportAsCSV(data: ExportData): void {
  const headers = EXPORT_CONTENT.CSV_HEADERS
  const rows = data.results.map(result => [
    result.source,
    result.isExist ? EXPORT_CONTENT.STATUS_TAKEN : EXPORT_CONTENT.STATUS_AVAILABLE,
    result.category || '',
    result.url
  ])
  
  const csvContent = [
    `Username Search Results for: ${data.username}`,
    `Date: ${data.timestamp}`,
    `Total Checked: ${data.totalChecked}`,
    `Available: ${data.totalAvailable}`,
    `Taken: ${data.totalTaken}`,
    '',
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = EXPORT_FILENAMES.CSV(data.username)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Export search results as Markdown
 */
export function exportAsMarkdown(data: ExportData): void {
  const availableResults = data.results.filter(r => !r.isExist)
  const takenResults = data.results.filter(r => r.isExist)

  const markdownContent = `${MARKDOWN_TEMPLATE.HEADER(data.username)}

${MARKDOWN_TEMPLATE.SUMMARY(data.totalChecked, data.totalAvailable, data.totalTaken, data.timestamp)}

${MARKDOWN_TEMPLATE.AVAILABLE_SECTION(availableResults.length)}

${MARKDOWN_TEMPLATE.TABLE_HEADER}
${availableResults.map(r => MARKDOWN_TEMPLATE.TABLE_ROW_AVAILABLE(r.source, r.category, r.url)).join('\n')}

${MARKDOWN_TEMPLATE.TAKEN_SECTION(takenResults.length)}

${MARKDOWN_TEMPLATE.TABLE_HEADER}
${takenResults.map(r => MARKDOWN_TEMPLATE.TABLE_ROW_TAKEN(r.source, r.category, r.url)).join('\n')}

${MARKDOWN_TEMPLATE.FOOTER}
`
  
  const blob = new Blob([markdownContent], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = EXPORT_FILENAMES.MARKDOWN(data.username)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Copy results to clipboard
 */
export function copyToClipboard(data: ExportData): Promise<boolean> {
  const text = data.results
    .map(r => `${r.source}: ${r.isExist ? `${EXPORT_CONTENT.ICON_TAKEN} ${EXPORT_CONTENT.STATUS_TAKEN}` : `${EXPORT_CONTENT.ICON_AVAILABLE} ${EXPORT_CONTENT.STATUS_AVAILABLE}`}`)
    .join('\n')

  const summary = `Username Search Results for @${data.username}
Total: ${data.totalChecked} | Available: ${data.totalAvailable} | Taken: ${data.totalTaken}

${text}`
  
  return navigator.clipboard.writeText(summary)
    .then(() => true)
    .catch(() => false)
}

/**
 * Generate shareable URL with results
 */
export function generateShareURL(username: string, results: SearchResult[]): string {
  const available = results.filter(r => !r.isExist).length
  const taken = results.filter(r => r.isExist).length

  const params = new URLSearchParams({
    [SHARE_URL.PARAM_USERNAME]: username,
    [SHARE_URL.PARAM_AVAILABLE]: available.toString(),
    [SHARE_URL.PARAM_TAKEN]: taken.toString(),
    [SHARE_URL.PARAM_TIMESTAMP]: Date.now().toString()
  })

  return `${SHARE_URL.BASE}?${params.toString()}`
}

/**
 * Export search results in the specified format
 */
export function exportResults(
  format: 'json' | 'csv' | 'markdown',
  username: string,
  results: SearchResult[],
  stats: {
    totalChecked: number
    totalAvailable: number
    totalTaken: number
  }
): void {
  const exportData: ExportData = {
    username,
    timestamp: new Date().toISOString(),
    totalChecked: stats.totalChecked,
    totalAvailable: stats.totalAvailable,
    totalTaken: stats.totalTaken,
    results
  }
  
  switch (format) {
    case 'json':
      exportAsJSON(exportData)
      break
    case 'csv':
      exportAsCSV(exportData)
      break
    case 'markdown':
      exportAsMarkdown(exportData)
      break
    default:
      console.error(`Unsupported export format: ${format}`)
  }
}