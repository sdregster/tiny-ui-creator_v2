
import { ObjectType, Parameter, SystemObject, SubObject } from "../types/object-types";

export const objectTypes: ObjectType[] = [
  {
    id: "compressor",
    label: "Компрессорная станция",
    count: 5,
  },
  {
    id: "oilPrep",
    label: "Установка подготовки нефти",
    count: 1,
  },
  {
    id: "pumpStation",
    label: "Дожимная насосная станция",
    count: 4,
  },
  {
    id: "complexPrep",
    label: "Установка комплексной подготовки нефти",
    count: 3,
  }
];

export const parametersByType: Record<string, Parameter[]> = {
  "compressor": [
    { id: "gas-volume", name: "Объем компримируемого газа, млн. м3/сут", value: 2.5 },
    { id: "input-pressure", name: "Давление газа на входе КС (изб.), МПа", value: "0.5 - 0.9" },
    { id: "temp-in", name: "Температура газа на входе, °C", value: "0 - 40" },
    { id: "output-pressure", name: "Давление газа на выходе дожимающего ГПА (изб.), МПа", value: "2.5 - 3.2" },
    { id: "comp-ratio", name: "Давление сжигаемой в факеле (изб.), МПа", value: "2.7 - 2.9" },
    { id: "temp-out", name: "Температура газа после АВО, °C", value: "-30 - 45" },
    { id: "pipe-pressure", name: "Давление газа, подаваемого в трубопровод, МПа", value: 12 }
  ],
  "oilPrep": [
    { id: "oil-volume", name: "Объем подготавливаемой нефти, тыс. м3/сут", value: 2.5 },
    { id: "water-content", name: "Содержание воды, %", value: 55 },
    { id: "mech-impurities", name: "Содержание механических примесей, %", value: 0.18 },
    { id: "temp-process", name: "Температура процесса, °C", value: 42 }
  ],
  "pumpStation": [
    { id: "pump-volume", name: "Объем перекачиваемой нефти, тыс. м3/сут", value: 3.5 },
    { id: "input-pressure-pump", name: "Давление на входе, МПа", value: 0.7 },
    { id: "output-pressure-pump", name: "Давление на выходе, МПа", value: 6.5 },
    { id: "productivity", name: "Производительность, млн. м3/сут", value: 4.2 }
  ],
  "complexPrep": [
    { id: "complex-volume", name: "Объем подготавливаемой нефти, тыс. м3/сут", value: 5.5 },
    { id: "gas-content", name: "Содержание газа, %", value: 12 },
    { id: "water-complex", name: "Содержание воды, %", value: 65 },
    { id: "temp-complex", name: "Температура процесса, °C", value: 48 }
  ]
};

export const systemObjects: SystemObject[] = [
  {
    id: "ДКС-1",
    name: "ДКС-1",
    type: "compressor",
    characteristics: [
      { id: "gas-volume", name: "Объем компримируемого газа, млн. м3/сут", value: 1.5 },
      { id: "input-pressure", name: "Давление газа на входе КС (изб.), МПа", value: "0.5 - 0.9" },
      { id: "output-pressure", name: "Давление газа на выходе, МПа", value: "2.5 - 2.8" }
    ]
  },
  {
    id: "ДКС-2",
    name: "ДКС-2",
    type: "compressor",
    characteristics: [
      { id: "gas-volume", name: "Объем компримируемого газа, млн. м3/сут", value: 2.5 },
      { id: "input-pressure", name: "Давление газа на входе КС (изб.), МПа", value: "0.7 - 1.0" },
      { id: "output-pressure", name: "Давление газа на выходе, МПа", value: "2.8 - 3.0" }
    ]
  },
  {
    id: "ДКС-3 УКПГ",
    name: "ДКС-3 УКПГ",
    type: "compressor",
    characteristics: [
      { id: "gas-volume", name: "Объем компримируемого газа, млн. м3/сут", value: 3.0 },
      { id: "input-pressure", name: "Давление газа на входе КС (изб.), МПа", value: "0.6 - 0.95" },
      { id: "output-pressure", name: "Давление газа на выходе, МПа", value: "2.7 - 2.9" }
    ]
  },
  {
    id: "ДКС-4",
    name: "ДКС-4",
    type: "compressor",
    characteristics: [
      { id: "gas-volume", name: "Объем компримируемого газа, млн. м3/сут", value: 2.2 },
      { id: "input-pressure", name: "Давление газа на входе КС (изб.), МПа", value: "0.6 - 0.85" },
      { id: "output-pressure", name: "Давление газа на выходе, МПа", value: "2.6 - 2.85" },
      { id: "temp-in", name: "Температура газа на входе, °C", value: "5 - 35" }
    ]
  },
  {
    id: "ДКС-5",
    name: "ДКС-5",
    type: "compressor",
    characteristics: [
      { id: "gas-volume", name: "Объем компримируемого газа, млн. м3/сут", value: 3.5 },
      { id: "input-pressure", name: "Давление газа на входе КС (изб.), МПа", value: "0.75 - 1.1" },
      { id: "output-pressure", name: "Давление газа на выходе, МПа", value: "3.0 - 3.2" },
      { id: "pipe-pressure", name: "Давление газа, подаваемого в трубопровод, МПа", value: 12 }
    ]
  },
  {
    id: "УПН-1",
    name: "УПН-1",
    type: "oilPrep",
    characteristics: [
      { id: "oil-volume", name: "Объем подготавливаемой нефти, тыс. м3/сут", value: 2.0 },
      { id: "water-content", name: "Содержание воды, %", value: 50 },
      { id: "temp-process", name: "Температура процесса, °C", value: 40 }
    ]
  },
  {
    id: "УПН-2",
    name: "УПН-2",
    type: "oilPrep",
    characteristics: [
      { id: "oil-volume", name: "Объем подготавливаемой нефти, тыс. м3/сут", value: 2.5 },
      { id: "water-content", name: "Содержание воды, %", value: 55 },
      { id: "mech-impurities", name: "Содержание механических примесей, %", value: 0.18 },
      { id: "temp-process", name: "Температура процесса, °C", value: 42 }
    ]
  },
  {
    id: "ДНС-1",
    name: "ДНС-1",
    type: "pumpStation",
    characteristics: [
      { id: "pump-volume", name: "Объем перекачиваемой нефти, тыс. м3/сут", value: 3.0 },
      { id: "input-pressure-pump", name: "Давление на входе, МПа", value: 0.5 },
      { id: "output-pressure-pump", name: "Давление на выходе, МПа", value: 6.0 }
    ]
  },
  {
    id: "ДНС-2",
    name: "ДНС-2",
    type: "pumpStation",
    characteristics: [
      { id: "pump-volume", name: "Объем перекачиваемой нефти, тыс. м3/сут", value: 3.5 },
      { id: "input-pressure-pump", name: "Давление на входе, МПа", value: 0.7 },
      { id: "output-pressure-pump", name: "Давление на выходе, МПа", value: 6.5 },
      { id: "productivity", name: "Производительность, млн. м3/сут", value: 4.2 }
    ]
  }
];

export const subObjectTypes: Record<string, SubObject[]> = {
  "compressor": [
    {
      id: "gpa-1",
      name: "Газоперекачивающий агрегат ГПА-Ц-6,3А (с двигателем НК-12СТ)",
      type: "Компрессорное устройство",
      characteristics: [
        { id: "productivity", name: "Производительность, млн. м³/сут", value: 11.0 },
        { id: "pressure", name: "Давление нагнетания, МПа (изб.)", value: 7.5 }
      ],
      count: 1,
      selected: false
    },
    {
      id: "cooling-system",
      name: "Блок аппаратов воздушного охлаждения",
      type: "Вспомогательное устройство",
      characteristics: [
        { id: "type", name: "Тип", value: "Секция" },
        { id: "quantity", name: "Количество аппаратов", value: "2" },
        { id: "volume", name: "Объем КГ, м³", value: "1,5" }
      ],
      count: 1,
      selected: false
    },
    {
      id: "filter-separator",
      name: "Фильтр-сепаратор",
      type: "Вспомогательное устройство",
      characteristics: [
        { id: "type", name: "Тип", value: "Циклонный" },
        { id: "pressure", name: "Рабочее давление, МПа", value: "1,0 - 4,0" },
        { id: "capacity", name: "Пропускная способность, млн. м³/сут", value: "10,0" }
      ],
      count: 1,
      selected: false
    },
    {
      id: "control-system",
      name: "Система автоматизированного управления",
      type: "Система управления",
      characteristics: [
        { id: "type", name: "Тип", value: "САУ" },
        { id: "capacity", name: "Количество входов/выходов", value: "600/400" }
      ],
      count: 1,
      selected: false
    }
  ],
  "oilPrep": [
    {
      id: "oil-separator",
      name: "Сепаратор нефти",
      type: "Разделительное устройство",
      characteristics: [
        { id: "type", name: "Тип", value: "Гравитационный" },
        { id: "pressure", name: "Рабочее давление, МПа", value: "0,6 - 1,6" },
        { id: "capacity", name: "Пропускная способность, тыс. м³/сут", value: "3,0" }
      ],
      count: 1,
      selected: false
    },
    {
      id: "heater",
      name: "Нагреватель",
      type: "Теплообменное оборудование",
      characteristics: [
        { id: "type", name: "Тип", value: "Пластинчатый" },
        { id: "temperature", name: "Температура нагрева, °C", value: "до 60" },
        { id: "power", name: "Тепловая мощность, МВт", value: "1,2" }
      ],
      count: 1,
      selected: false
    }
  ],
  "pumpStation": [
    {
      id: "pump-unit",
      name: "Насосный агрегат",
      type: "Насосное оборудование",
      characteristics: [
        { id: "type", name: "Тип", value: "Центробежный" },
        { id: "capacity", name: "Производительность, м³/ч", value: "150" },
        { id: "head", name: "Напор, м", value: "200" }
      ],
      count: 2,
      selected: false
    },
    {
      id: "pump-control",
      name: "Система управления насосами",
      type: "Система управления",
      characteristics: [
        { id: "type", name: "Тип", value: "АСУТП" },
        { id: "features", name: "Функции", value: "Мониторинг, управление, защита" }
      ],
      count: 1,
      selected: false
    }
  ]
};
