'use client'

import { FC } from 'react'

interface TableProps {
  data: any
}

export const Table: FC<TableProps> = ({ data }) => {
  return (
    <table>
      {data?.rows?.map((x: any, i: number) => {
        return (
          <tr key={i}>
            {x?.cells.map((y: any, z: string) => {
              return <td key={i + '_' + z}>{y}</td>
            })}
          </tr>
        )
      })}
    </table>
  )
}
