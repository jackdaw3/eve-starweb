<template>
    <div class="History" v-if="renderStock">
        <highcharts class="stock" :constructor-type="'stockChart'" :options="chartOptions"/>
    </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { onMounted, reactive, ref, watch } from 'vue';
import { BACKEND_SERVER } from '~/constants';
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const props = defineProps<{
    regionId: string;
    itemId: string;
    type: string;
}>();

let renderStock = ref(false)
let chartOptions = reactive<any>({});
const regionName = ref("")
const marketLabel = "market"
const history = reactive({
    average: [] as [number, number][],
    volume: [] as [number, number][],
    minAndmax: [] as [number, number, number][],
    average5d: [] as [number, number][],
    average20d: [] as [number, number][],
    minAndmax5d: [] as [number, number, number][],
    borderWidth: document.documentElement.clientWidth * 0.0388,
});

onMounted(async () => {
    if (props.itemId != "0") {
        updateChart()
    }
});

watch([props, locale], async () => {
    if (props.itemId != "0") {
        clear()
        updateChart()
    }
});

async function updateChart(){
    await getHistory()
    chartOptions = createChartOptions()
    if (props.type == marketLabel) {
        await getRegionName()
        chartOptions.title.text = `${t('history.location')}: ${regionName.value}`
    }
    renderStock.value = true
}

async function getHistory() {
    try {
        const params: Record<string, any> = {
            regionId: props.regionId
        };

        if (props.type === marketLabel) {
            params.itemId = props.itemId;
        } else {
            params.offerId = props.itemId;
        }

        const response = await axios.get(BACKEND_SERVER + `${props.type}/history`, {
            params,
        });

        response.data.forEach((item: any) => {
            history.average.push([Date.parse(item.Date), item.Average]);
            history.volume.push([Date.parse(item.Date), item.Volume]);
            history.minAndmax.push([Date.parse(item.Date), item.Lowest, item.Highest]);
            history.average5d.push([Date.parse(item.Date), item.Average5d]);
            history.average20d.push([Date.parse(item.Date), item.Average20d]);
            history.minAndmax5d.push([Date.parse(item.Date), item.Lowest5d, item.Highest5d]);
        });
    } catch (error) {
        console.error('Error fetching history data:', error);
    }
}

async function getRegionName() {
    try {
        const response = await axios.get(`${BACKEND_SERVER}common/regiondetail`, {
            params: {
                regionId: props.regionId,
                lang: locale.value,
            },
        });
        regionName.value = response.data.RegionName;
    } catch (error) {
        console.error(error);
    }
}

function createChartOptions() {
  return reactive({
    chart: {
        backgroundColor: "#202124",
        alignTicks: false,
        marginRight: history.borderWidth,
    },
    title: {
        text: "",
        align: 'center',
        floating: true,
        y: document.documentElement.clientHeight * 0.0166,
        style: {
            fontSize: '0.8em',
            color: "#D0D3D4",
        }
    },
    credits: {
        enabled: false,
    },
    scrollbar: {
        enabled: false,
    },
    legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'top',
        backgroundColor: "#202124",
        layout: 'horizontal',
        itemStyle: {
            color: "#D0D3D4"
        },
    },
    navigator: {
        series: {
            data: history.average,
            color: "#3498DB",
        },
        xAxis: {
            labels: {
                style: {
                    color: "#D0D3D4",
                    fontWeight: 'bold',
                    textOutline: 'none'
                }
            },
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            dateTimeLabelFormats: {
                millisecond: '%Y.%m.%d',
                second: '%Y.%m.%d',
                minute: '%Y.%m.%d',
                hour: '%Y.%m.%d',
                day: '%Y.%m.%d',
                week: '%Y.%m.%d',
                month: '%Y.%m.%d',
                year: '%Y.%m.%d'
            },
        },
        yAxis: {
            gridLineWidth: 0,
            minorGridLineWidth: 0,
        },
    },
    navigation: {
        buttonOptions: {
            theme: {
                states: {
                    hover: {
                        fill: "#0D4579"
                    },
                    select: {
                        stroke: "#0D4579",
                        fill: "#0D4579"
                    }
                }
            }
        },
        menuItemHoverStyle: {
            background: "#0D4579",
            color: "#D0D3D4",
        },
        menuItemStyle: {
            color: "#D0D3D4",
        },
        menuStyle: {
            background: "#202124",
        },
    },
    exporting: {
        enabled: true,
        buttons: {
            contextButton: {
                symbolY: 10,
                height: 20,
                menuItems: ['viewFullscreen', "printChart"],
                symbolStroke: "#D0D3D4",
                theme: {
                    fill: 'none',
                },
            },
        },
    },
    rangeSelector: {
        inputDateFormat: '%Y.%m.%d',
        inputEditDateFormat: '%Y.%m.%d',
        allButtonsEnabled: true,
        selected: 0,
        inputEnabled: true,
        inputStyle: {
            color: "#D0D3D4"
        },
        labelStyle: {
            color: "#D0D3D4",
            fontWeight: 'bold',
        },
        buttons: [{
            type: 'month',
            count: 1,
            text: t('history.rangeSelector.month'),
        }, {
            type: 'month',
            count: 3,
            text: t('history.rangeSelector.threeMonths'),
        }, {
            type: 'month',
            count: 6,
            text: t('history.rangeSelector.halfYear'),
        }, {
            type: 'ytd',
            text: t('history.rangeSelector.yearToDay'),
        }, {
            type: 'year',
            count: 1,
            text: t('history.rangeSelector.year'),
        }, {
            type: 'all',
            text: t('history.rangeSelector.all'),
        }],
        buttonTheme: {
            fill: "none",
            stroke: "none",
            "stroke-width": 0,
            r: 8,
            style: {
                color: "#D0D3D4",
                fontWeight: "bold",
            },
            states: {
                hover: {
                    fill: "#0D4579",
                    style: {
                        color: "#D0D3D4",
                    },
                },
                select: {
                    fill: "#0D4579",
                    style: {
                        color: "#D0D3D4",
                    },
                },
            },
        },
    },
    xAxis: {
        gridLineWidth: 0,
        gridLineColor: "#505053",
        lineColor: "#505053",
        labels: {
            style: {
                color: "#D0D3D4",
            },
        },
        crosshair: {
            dashStyle: 'dot',
        },
        dateTimeLabelFormats: {
            millisecond: '%Y.%m.%d',
            second: '%Y.%m.%d',
            minute: '%Y.%m.%d',
            hour: '%Y.%m.%d',
            day: '%Y.%m.%d',
            week: '%Y.%m.%d',
            month: '%Y.%m.%d',
            year: '%Y.%m.%d'
        },
    },
    yAxis: [
        {
            gridLineWidth: 0.3,
            gridLineColor: "#505053",
            minorGridLineWidth: 0,
            startOnTick: false,
            endOnTick: false,
            labels: {
                align: "right",
                x: -3,
                style: {
                    color: "#D0D3D4",
                },
            },
            title: {
                text: t('history.price'),
                style: {
                    color: "#D0D3D4",
                },
            },
            height: "60%",
            lineWidth: 2,
            lineColor: "#505053",
            resize: {
                enabled: true,
            },
        },
        {
            gridLineWidth: 0.3,
            gridLineColor: "#505053",
            minorGridLineWidth: 0,
            labels: {
                align: "right",
                x: -3,
                style: {
                    color: "#D0D3D4",
                },
            },
            title: {
                text: t('history.volume'),
                style: {
                    color: "#D0D3D4",
                },
            },
            top: "65%",
            height: "35%",
            offset: 0,
            lineWidth: 2,
            lineColor: "#505053",
        },
    ],
    tooltip: {
        split: false,
        xDateFormat: "%Y.%m.%d",
        backgroundColor: "rgba(0,0,0,0.8)",
        shared: true,
        valueDecimals: 0,
        style: {
            fontSize: 13,
            color: "#D0D3D4",
        },
        headerFormat: '<span style="font-size: 13px">{point.key}</span><br/>',
    },
    series: [
        {
            name: t('history.average'),
            data: history.average,
            yAxis: 0,
            color: "#D68910",
            lineWidth: 0,
            zIndex: 9,
            marker: {
                enabled: true,
                radius: 2.65,
            },
        },
        {
            name: t('history.minAndmax'),
            data: history.minAndmax,
            type: "columnrange",
            yAxis: 0,
            zIndex: 8,
            color: "#A6ACAF",
            opacity: 0.6,
            pointWidth: 3,
        },
        {
            name: t('history.average5d'),
            data: history.average5d,
            zIndex: 7,
            yAxis: 0,
            color: "#1D8348",
            lineWidth: 1.5,
            marker: {
                radius: 2.65,
            },
        },
        {
            name: t('history.average20d'),
            data: history.average20d,
            zIndex: 7,
            yAxis: 0,
            color: "#C0392B",
            lineWidth: 1.5,
            marker: {
                radius: 1.65,
            },
        },
        {
            name: t('history.minAndmax5d'),
            data: history.minAndmax5d,
            type: "arearange",
            zIndex: 6,
            yAxis: 0,
            color: "#85C1E9",
            opacity: 0.2,
        },
        {
            name: t('history.volume'),
            type: "column",
            data: history.volume,
            yAxis: 1,
            color: "#0F5C70",
        },
    ],
});
}

function clear() {
    renderStock.value = false
    history.average = [];
    history.volume = [];
    history.minAndmax = [];
    history.average5d = [];
    history.average20d = [];
    history.minAndmax5d = [];
}
</script>
<style scoped>
.stock {
    width: 100%;
    height: 100%;
}

input.highcharts-range-selector:focus {
    background-color: #0D4579;
}
</style>