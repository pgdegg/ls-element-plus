import { ElLoading } from '@element-plus/components/loading'
import { ElMessage } from '@element-plus/components/message'
import { ElMessageBox } from '@element-plus/components/message-box'
import { ElNotification } from '@element-plus/components/notification'

import type { Plugin } from 'vue'

export default [ElLoading, ElMessage, ElMessageBox, ElNotification] as Plugin[]
