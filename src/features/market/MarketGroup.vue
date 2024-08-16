<template>
    <div class="marketgroup" @contextmenu.prevent v-loading="loading" :element-loading-spinner="SVG"
        element-loading-svg-view-box="-10, -10, 50, 50">
        <el-tabs style="margin-top: -7px;">
            <el-tab-pane :label="t('market.browse')">
                <div style="display: flex">
                    <el-input v-model="query" :placeholder="t('market.lookup')" @input="onQueryChanged" clearable
                        :prefix-icon="Search" />
                    &nbsp;&nbsp;
                    <el-button plain :icon="Fold" style="width: 20px; border: none; padding: 0; margin-right: 3%"
                        @click="collapseAllNodes(treeData)" />
                </div>

                <el-tree-v2 ref="treeRef" :data="treeData" :props="props" :height="treeHeight"
                    :filter-method="filterMethod" style="margin-top: 7px">
                    <template #default="{ node }">
                        <div class="tree-node" v-if="node.isLeaf" @click="leafNodeClick(node)"
                            @contextmenu="quickbarAdd(node, $event)">
                            <el-image style="height: 22px;" fit="fill" :src="getIcon(node.data.icon)" loading="lazy"
                                @click.stop="openItem(node)" />
                            <span>{{ node.label }}</span>
                        </div>
                        <div class="tree-node" v-else @contextmenu="quickbarAdd(node, $event)">
                            <el-image style="height: 22px;" fit="fill" :src="getIcon(node.data.icon)" loading="lazy" />
                            <span>{{ node.label }}</span>
                        </div>
                    </template>
                </el-tree-v2>
            </el-tab-pane>

            <el-tab-pane :label="t('market.quickbar')" lazy>
                <el-button-group style="margin-top: -10px;display: flex">
                    <el-button plain :icon="Download" style="width: 20px; border: none; padding: 0;"
                        @click="importQuickbar($event)" />
                    <el-button plain :icon="Upload" style="width: 20px; border: none; padding: 0; margin-left: 4px;"
                        @click="exportQuickbar($event)" />
                    <el-button plain :icon="Delete" style="width: 20px; border: none; padding: 0; margin-left: 4px;"
                        @click="clearQuickbar($event)" />
                    <el-button plain :icon="Fold"
                        style="width: 20px; border: none; padding: 0; margin-left: auto; margin-right: 2.6%;"
                        @click="collapseQuickBar(quickbarData)" />
                </el-button-group>

                <el-tree-v2 ref="quickbarTreeRef" :data="quickbarData" :props="props" :height="treeHeight"
                    v-if="quickbarVisible">
                    <template #default="{ node }">
                        <div class="tree-node" v-if="node.isLeaf" @click="leafNodeClickQuickBar(node)"
                            @contextmenu="quickbarRemove(node, $event)">
                            <el-image style="height: 22px;" fit="fill" :src="getIcon(node.data.icon)" loading="lazy"
                                @click.stop="openItem(node)" />
                            <span>{{ node.label }}</span>
                        </div>
                        <div class="tree-node" v-else @contextmenu="quickbarRemove(node, $event)">
                            <el-image style="height: 22px;" fit="fill" :src="getIcon(node.data.icon)" loading="lazy" />
                            <span>{{ node.label }}</span>
                        </div>
                    </template>
                </el-tree-v2>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { ElMessage, ElTreeV2 } from 'element-plus';
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { Fold, Search, Download, Upload, Delete } from '@element-plus/icons-vue'
import axios from 'axios';
import { BACKEND_SERVER, ICON_SERVER, SVG } from '~/constants';
import { useStore } from 'vuex';
import ContextMenu from '@imengyu/vue3-context-menu'

interface Tree {
    id: number
    label: string
    icon: string
    children?: Tree[]
}

interface Item {
    itemId: number,
    itemName: string,
    parent: string[],
    visible: boolean,
}

type Language = 'de' | 'en' | 'es' | 'fr' | 'ja' | 'ko' | 'ru' | 'zh';

const props = {
    value: 'id',
    label: 'label',
    icon: 'icon',
    children: 'children',
}

const { t, locale } = useI18n();
const store = useStore();
const treeData = ref<Tree[]>([]);
const quickbarData = ref<Tree[]>([]);
const query = ref('')
const treeRef = ref<InstanceType<typeof ElTreeV2>>()
const quickbarTreeRef = ref<InstanceType<typeof ElTreeV2>>()
const treeHeight = computed(() => {
    return document.documentElement.clientHeight * 0.793;
});

let loading = ref(false)
let quickbarVisible = ref(true)

onMounted(async () => {
    const storedLanguage = localStorage.getItem('language')
    if (storedLanguage) {
        locale.value = storedLanguage as Language;
    }
    await loadMarketgroups();
    const storedTableForm = localStorage.getItem('marketQuickbar');
    if (storedTableForm) {
        quickbarData.value = JSON.parse(storedTableForm);
    }
});

watch(locale, async () => {
    try {
        await loadMarketgroups();
        updateStoreItem();
    } catch (error) {
        console.error(error);
    }
});

async function loadMarketgroups() {
    loading.value = true
    try {
        const response = await axios.get(`${BACKEND_SERVER}market/marketgroup`, {
            params: {
                lang: locale.value,
            },
        });
        sortMarketGroup(response.data)
        treeData.value = transformToTree(response.data);
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false
    }
}

function sortMarketGroup(data: any[]) {
    data.sort((a: any, b: any) => a.MarketGroupName.localeCompare(b.MarketGroupName, locale.value));
    data.forEach((item: any) => {
        if (item.Children && Array.isArray(item.Children)) {
            sortMarketGroup(item.Children);
        }
    });
}

function transformToTree(data: any[]): Tree[] {
    return data.map(item => {
        const treeItem: Tree = {
            id: item.MarketGroupId,
            icon: item.IconFile,
            label: item.MarketGroupName,
        };

        if (item.Children && item.Children.length > 0) {
            treeItem.children = transformToTree(item.Children);
        }
        return treeItem;
    });
}

const leafNodeClick = (node: any) => {
    let item: Item = {
        itemId: node.key,
        itemName: node.label,
        parent: [] as string[],
        visible: true,
    };
    while (node.parent) {
        item.parent.unshift(node.parent.label)
        node = node.parent
    }
    store.commit('market/setItem', item);
};

const leafNodeClickQuickBar = (node: any) => {
    let item: Item = {
        itemId: node.key,
        itemName: node.label,
        parent: [] as string[],
        visible: true,
    };
    while (node.parent) {
        item.parent.unshift(node.parent.label)
        node = node.parent
    }
    item.parent.unshift(t('market.quickbar'))
    store.commit('market/setItem', item);
};

function onQueryChanged(query: string) {
    let queryText = query.trim();
    if (queryText.endsWith('*')) {
        queryText = queryText.slice(0, -1);
    }
    treeRef.value!.filter(queryText);
    if (!queryText) {
        collapseAllNodes(treeData.value)
    }
}

function filterMethod(query: string, node: any) {
    return node.label!.toLowerCase().includes(query.toLowerCase());
}

function collapseAllNodes(trees: Tree[]) {
    for (const tree of trees) {
        let node = treeRef.value!.getNode(tree);
        if (node) {
            treeRef.value!.collapseNode(node);
        }
        if (tree.children) {
            collapseAllNodes(tree.children);
        }
    }
}

function collapseQuickBar(trees: Tree[]) {
    for (const tree of trees) {
        let node = quickbarTreeRef.value!.getNode(tree);
        if (node) {
            quickbarTreeRef.value!.collapseNode(node);
        }
        if (tree.children) {
            collapseQuickBar(tree.children);
        }
    }
}

function openItem(node: any) {
    axios.get(`${BACKEND_SERVER}common/itemdetail`, {
        params: {
            itemId: node.key,
            lang: locale.value
        },
        timeout: 5000,
    })
        .then((response) => {
            let ItemName = response.data.ItemName;
            let Volume = response.data.Volume;
            Volume = Volume + "\u2009m³";
            let itemDetail = {
                ItemId: response.data.ItemId,
                ItemName: ItemName,
                Description: response.data.Description,
                Volume: Volume
            };
            store.commit('loyalty/setItemVisible', true);
            store.commit('loyalty/setItemDetail', itemDetail);
        })
        .catch(error => {
            let params = new URLSearchParams(error.config.params).toString()
            let fullUrl = error.config.url + (params ? `?${params}` : '');
            ElMessage({
                dangerouslyUseHTMLString: true,
                message: `${error.response.data}: ${fullUrl}`,
                type: "error",
                showClose: true,
                duration: 6000,
            });
        });
}

function updateStoreItem() {
    const item = store.state.market.item;
    const updatedItem = findNode(item.itemId, treeData.value);
    if (updatedItem) {
        store.commit('market/setItem', updatedItem);
    }
}

function findNode(id: number, nodes: Tree[] = treeData.value, path: string[] = []): Item | undefined {
    for (const node of nodes) {
        const currentPath = [...path, node.label];
        if (node.id === id) {
            return {
                itemId: node.id,
                itemName: node.label,
                parent: currentPath.slice(0, -1),
                visible: true,
            };
        } else if (node.children && node.children.length > 0) {
            const found = findNode(id, node.children, currentPath);
            if (found) {
                return found;
            }
        }
    }
    return undefined;
}

function quickbarAdd(node: any, event: MouseEvent) {
    quickbarVisible.value = false
    ContextMenu.showContextMenu({
        customClass: "mac dark",
        x: event.x,
        y: event.y,
        items: [
            {
                label: t('market.quickbarAdd'),
                onClick: () => {
                    if (isNodeDuplicate(node.data, quickbarData.value)) {
                        ElMessage({
                            message: `${node.data.label} ${t('market.quickbarDuplicate')}!`,
                            type: "warning",
                            showClose: true,
                            duration: 6000,
                        });
                        return
                    }
                    const deepCopy = JSON.parse(JSON.stringify(node.data));
                    quickbarData.value.push(deepCopy);
                    localStorage.setItem('marketQuickbar', JSON.stringify(quickbarData.value));
                },
            },
        ],
        onClose: () => {
            quickbarVisible.value = true
        }
    });
}

function quickbarRemove(node: any, event: MouseEvent) {
    ContextMenu.showContextMenu({
        customClass: "mac dark",
        x: event.x,
        y: event.y,
        items: [
            {
                label: t('market.quickbarRemove'),
                onClick: () => {
                    quickbarData.value = removeNodeById(quickbarData.value, node.data.id)
                    quickbarVisible.value = false
                    localStorage.setItem('marketQuickbar', JSON.stringify(quickbarData.value));
                }
            },
        ],
        onClose: () => {
            quickbarVisible.value = true
        }
    });
}

function isNodeDuplicate(node: Tree, tree: Tree[]): boolean {
    return tree.some(existingNode => existingNode.id === node.id);
}

function removeNodeById(nodes: Tree[], targetId: number): Tree[] {
    return nodes.filter(node => {
        if (node.id === targetId) {
            return false;
        }
        if (node.children) {
            node.children = removeNodeById(node.children, targetId);
            if (node.children.length === 0) {
                return false;
            }
        }
        return true;
    });
}

function importQuickbar(event: MouseEvent) {
    ContextMenu.showContextMenu({
        customClass: "mac dark",
        x: event.x,
        y: event.y,
        items: [
            {
                label: t('market.quickbarImport'),
                onClick: () => {
                    navigator.clipboard.readText()
                        .then(text => {
                            if ( text == undefined || text == null || text == "") {
                                return
                            }
                            quickbarData.value = quickbarData.value.concat(parseTrees(text));
                            quickbarVisible.value = false
                            localStorage.setItem('marketQuickbar', JSON.stringify(quickbarData.value));
                        })
                        .catch(err => {
                            console.error('Failed to read clipboard contents: ', err);
                        })
                        .finally(() => {
                            quickbarVisible.value = true;
                        });
                }
            },
        ]
    });
}

function exportQuickbar(event: MouseEvent) {
    ContextMenu.showContextMenu({
        customClass: "mac dark",
        x: event.x,
        y: event.y,
        items: [
            {
                label: t('market.quickbarExport'),
                onClick: () => {
                    const value = formatTrees(quickbarData.value)
                    navigator.clipboard.writeText(value)
                }
            },
        ]
    });
}

function clearQuickbar(event: MouseEvent) {
    ContextMenu.showContextMenu({
        customClass: "mac dark",
        x: event.x,
        y: event.y,
        items: [
            {
                label: t('market.quickbarClear'),
                onClick: () => {
                    quickbarVisible.value = false
                    localStorage.removeItem('marketQuickbar')
                    quickbarData.value = [];
                }
            },
        ],
        onClose: () => {
            quickbarVisible.value = true
        }
    });
}

function formatTrees(trees: Tree[]): string {
    let result = "";
    let stack: [Tree, number][] = [];
    for (const tree of trees) {
        stack.push([tree, 0]);
        while (stack.length > 0) {
            const [currentTree, level] = stack.pop()!;
            let hasChildren = false
            if (currentTree.children && currentTree.children.length > 0) {
                hasChildren = true
            }

            let marker = level === 0
                ? (hasChildren ? "+" : "")
                : (hasChildren ? "+".repeat(level + 1) : "-".repeat(level));
            result += `${marker} ${currentTree.label}\n`;

            if (currentTree.children) {
                for (let i = currentTree.children.length - 1; i >= 0; i--) {
                    stack.push([currentTree.children[i], level + 1]);
                }
            }
        }
    }
    return result;
}

function parseTrees(input: string): Tree[] {
    const lines = input.split('\n').filter(line => line.trim() !== '');
    const stack: [Tree, number][] = [];
    const result: Tree[] = [];
    let count = -1;

    for (const line of lines) {
        const trimmed = line.trim();
        const markerMatch = trimmed.match(/^(\++)|^(\-+)/);
        const marker = markerMatch ? markerMatch[0] : '';
        const label = trimmed.replace(/^(\++)\s*|^(\-+)\s*/, '');

        let level: number;
        let node: Tree;
        if (marker.startsWith('+')) {
            level = marker.length - 1;
            node = { id: count--, label: label, icon: 'menu/folder.png' };
        } else {
            level = marker.length;
            let defaultNode: Tree = {
                label: label,
                id: count--,
                icon: 'menu/7_64_15.png'
            }
            node = findTreeNodeByLabel(label, defaultNode)
        };

        if (marker === '') {
            result.push(node);
            continue;
        }

        while (stack.length && stack[stack.length - 1][1] >= level) {
            stack.pop();
        }

        if (stack.length === 0) {
            result.push(node);
            stack.push([node, level]);
        } else {
            const parent = stack[stack.length - 1][0];
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(node);
            stack.push([node, level]);
        }
    }

    return result;
}

function findTreeNodeByLabel(label: string, defaultNode: Tree): Tree {
    const stack: Tree[] = [];
    for (const tree of treeData.value) {
        stack.push(tree);
    }

    while (stack.length > 0) {
        const currentTree = stack.pop()!;
        if (currentTree.label === label) {
            return currentTree;
        }

        if (currentTree.children) {
            for (const child of currentTree.children) {
                stack.push(child);
            }
        }
    }

    return defaultNode;
}

function getIcon(iconFile: string): string {
    return `${ICON_SERVER}${iconFile}`;
}

</script>

<style>
.tree-node {
    display: flex;
    text-align: left;
    white-space: nowrap;
    cursor: pointer;
    color: #EBEBEB;
}

.tree-node>* {
    margin-right: 6px;
}

.tree-node:hover {
    background-color: rgba(13, 69, 121, 0.3);
}

.tree-node .el-image {
    min-width: 22px;
}

.el-tree-node__expand-icon {
    display: none;
}

.leaf-button {
    height: 22px;
    width: 20px;
    border: none;
    padding: 0;
    background-color: transparent;
    margin-left: auto;
}

.leaf-button:hover {
    background-color: transparent;
}

.el-tabs__nav-wrap::after {
    bottom: 0;
    width: 97%;
    height: 1px;
    background-color: #4C4D4F;
}

.mx-menu-bar.mac.dark,
.mx-context-menu.mac.dark {
    --mx-menu-backgroud: #2D2E31 !important;
    --mx-menu-hover-backgroud: rgba(13, 69, 121, 0.45) !important;
    --mx-menu-active-backgroud: rgba(13, 69, 121, 0.45) !important;
}
</style>