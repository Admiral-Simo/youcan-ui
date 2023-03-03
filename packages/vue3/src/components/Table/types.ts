import type { Component } from 'vue';
import type { StaticStatusDefinition, StatusDefinition } from '../Status/types';
import type { PercentageType } from '../Percentage/types';
import type { ButtonIconPosition, ButtonSize } from '../Button/types';
import type { HTMLInputTypeAttribute } from '../Input/types';
import type { ThumbnailSize } from '~/components/Thumbnail/types';

export interface HandleSubCompModel {
  index: number
  accessor: string
  data: unknown
  child?: boolean
}

export interface TableColumn {
  label?: string
  accessor: string
  sortable?: TableColumnSort
}

export type TableColumnSort = 'none' | 'asc' | 'desc';

export interface TableActions {
  label: string
  iconName?: string
  criteria?: (value: TableData) => boolean
  events?: {
    click: (row: TableDataRow, index?: number) => void
  }
}

export interface TableColumnValue {
  value: string | number | TableDataComposable
  accessor: string
  isString: boolean
  component?: Component | undefined
}

export interface TableColumnValues {
  [key: string]: TableColumnValue
}

export interface TableDataRow {
  [key: string]: string | number | TableDataComposable
}

export interface TableData {
  row: TableDataRow
  children?: TableDataRow[]
}

export interface TableInternalData {
  row: Record<keyof TableDataRow, TableColumnValue>
  children?: Pick<TableInternalData, 'row'>[]
}

export type TableComposableVariant = 'link' | 'thumbnail' | 'status' | 'static-status' | 'percentage' | 'button' | 'rating' | 'toggle' | 'counter' | 'icon' | 'input';

interface TableComposable<T extends TableComposableVariant, U, V extends Record<string, () => void> = Record<string, () => void>> {
  variant: Extract<TableComposableVariant, T>
  data: U
  events?: V
}

export type TableDataComposable =
  TableComposable<'link', TableDataLink> |
  TableComposable<'thumbnail', TableDataThumbnail> |
  TableComposable<'status', TableDataStatus> |
  TableComposable<'static-status', TableDataStaticStatus> |
  TableComposable<'percentage', TableDataPercentage> |
  TableComposable<'button', TableDataButton, { click: () => void }> |
  TableComposable<'rating', TableDataRating> |
  TableComposable<'toggle', TableDataToggle> |
  TableComposable<'counter', TableDataCounter> |
  TableComposable<'input', TableDataInput>;

interface TableDataLink {
  label?: string
  href: string
}

interface TableDataThumbnail {
  size: ThumbnailSize
  src?: string
  alt?: string
}

interface TableDataStatus {
  statuses: StatusDefinition[]
  modelValue: StatusDefinition
}

interface TableDataStaticStatus {
  status: StaticStatusDefinition
}

interface TableDataPercentage {
  percentage: number
  type: PercentageType
}

interface TableDataButton {
  label: string
  iconName?: string
  size?: ButtonSize
  disabled?: boolean
  iconPosition?: ButtonIconPosition
  roundedFull?: boolean
}

interface TableDataRating {
  score: number
  ceil?: number
}

interface TableDataToggle {
  modelValue: boolean
}

interface TableDataCounter {
  modelValue: string
  max?: number
  min?: number
  step?: number
  id?: string
  disabled?: boolean
}

type TableDataInput = TableDataNumberInput | TableDataGenericInput;

interface BaseTableDataInput<T extends HTMLInputTypeAttribute> {
  modelValue: string
  type: T
  id?: string
  disabled?: boolean
}

interface TableDataNumberInput extends BaseTableDataInput<'number'> {
  max?: number
  min?: number
  step?: number
}

interface TableDataGenericInput extends BaseTableDataInput<Exclude<HTMLInputTypeAttribute, 'number'>> {}
