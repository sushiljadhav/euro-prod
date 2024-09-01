"use client"
import React from "react"

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Pagination,
  type ChipProps,
  type Selection,
  type SortDescriptor,
  Chip,
} from "@nextui-org/react"
import { FaCaretDown } from "react-icons/fa"
import { FiPlusCircle } from "react-icons/fi"
import { IoSearchOutline } from "react-icons/io5"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi"

import ButtonUI from "../Button/ButtonUI"
import {
  type IUser,
  type IEmployeeTable,
} from "@/src/model/employee/IEmployeeTable"
import { capitalize } from "@/src/utils/capitalize"

const statusColorMap: Record<string, ChipProps["color"]> = {
  Active: "success",
  Inactive: "danger",
}

const TableUI: React.FC<IEmployeeTable> = ({
  columns,
  users,
  initialColumns,
  isLoading,
  onAddButtonClick,
  onViewClick,
  onEditClick,
  onDeleteClick,
}): React.JSX.Element => {
  const [filterValue, setFilterValue] = React.useState("")
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(initialColumns)
  )
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  })

  const [page, setPage] = React.useState(1)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    )
  }, [columns, visibleColumns])

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users]

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.employee_name.toLowerCase().includes(filterValue.toLowerCase())
      )
    }

    return filteredUsers
  }, [users, hasSearchFilter, filterValue])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: IUser, b: IUser) => {
      const first = a[sortDescriptor.column as keyof typeof users] as number
      const second = b[sortDescriptor.column as keyof typeof users] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === "descending" ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = React.useCallback(
    (user: IUser, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof IUser]
      const status = user.is_active ? "Active" : "Inactive"

      switch (columnKey) {
        case "employee_name":
          return (
            <User
              avatarProps={{
                radius: "full",
                // name: user.employee_name,
              }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          )
        case "is_active":
          return (
            <Chip
              className="gap-1 border-none capitalize text-white"
              color={statusColorMap[status]}
              size="sm"
              variant="solid"
            >
              {status}
            </Chip>
          )
        case "actions":
          return (
            <div className="relative flex items-center justify-end gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <PiDotsThreeOutlineVerticalFill className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem onClick={() => onViewClick?.(user)}>
                    View
                  </DropdownItem>
                  <DropdownItem onClick={() => onEditClick?.(user)}>
                    Edit
                  </DropdownItem>
                  <DropdownItem onClick={() => onDeleteClick?.(user)}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )
        default:
          return cellValue
      }
    },
    [onDeleteClick, onEditClick, onViewClick]
  )

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value))
      setPage(1)
    },
    []
  )

  const onSearchChange = React.useCallback((value?: string) => {
    if (value != null) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue("")
    }
  }, [])

  const onClear = React.useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-end justify-between gap-3">
          <Input
            isClearable
            variant="bordered"
            className="w-full sm:max-w-[44%] lg:max-w-[400px]"
            classNames={{
              inputWrapper: [
                "border",
                "border-primary-50",
                "bg-white",
                "h-[20px]",
                "p-2.5",
                "shadow-sm",
                "placeholder:text-sm",
              ],
              input: [
                "bg-transparent",
                "text-tiny",
                "text-textContent",
                "placeholder:text-textContent",
                "w-full",
              ],
            }}
            placeholder="Search by name..."
            startContent={<IoSearchOutline className="size-4" />}
            value={filterValue}
            onClear={() => {
              onClear()
            }}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<FaCaretDown className="text-small" />}
                  variant="flat"
                  radius="sm"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <ButtonUI
              className="min-h-10 py-3 text-sm font-medium text-white"
              size="sm"
              endContent={<FiPlusCircle className="size-4" />}
              onClick={(event: React.MouseEvent) => {
                if (onAddButtonClick !== undefined) {
                  onAddButtonClick(event)
                }
              }}
            >
              Add New
            </ButtonUI>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {users.length} users
          </span>
          <label className="flex items-center text-small text-default-400">
            Rows per page:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [
    filterValue,
    onSearchChange,
    visibleColumns,
    columns,
    users,
    onRowsPerPageChange,
    onClear,
    onAddButtonClick,
  ])

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between p-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }, [
    selectedKeys,
    filteredItems.length,
    page,
    pages,
    onPreviousPage,
    onNextPage,
  ])

  const defaultStyle = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-full", "w-full"],
      th: ["bg-white", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        "group-data-[middle=true]:last:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  )

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky={false}
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={defaultStyle}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns} className="bg-white">
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No users found"}
        items={sortedItems}
        isLoading={isLoading}
      >
        {(item) => (
          <TableRow key={item?.employee_id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TableUI
