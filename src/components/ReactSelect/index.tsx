import Select, { ActionMeta, GroupBase, Props } from "react-select"
import {
  createStylesContext,
  type SystemStyleObject,
  ThemingProps,
  useMultiStyleConfig,
} from "@chakra-ui/react"

import { components, reactSelectAnatomyKeys } from "./innerComponents"

const [ReactSelectStylesProvider, useSelectStyles] =
  createStylesContext("ReactSelect")

export const useReactSelectStyles = useSelectStyles as () => Record<
  (typeof reactSelectAnatomyKeys)[number],
  SystemStyleObject
>

/**
 * Type for onChange handler in the `Select` component
 *
 * Specifically declared for single selects.
 *
 * @see https://react-select.com/typescript#onchange
 *
 * @typeParam Option - The object type in the array
 * @param newValue - The object returned from the payload
 * @param actionMeta - The set of actions that can be run on change
 */
export type ReactSelectOnChange<Option> = (
  newValue: Option | null,
  actionMeta: ActionMeta<Option>
) => void

/**
 * Custom Built Version of the `react-select` single-select component.
 *
 * A styles provider wraps the original `Select` to send Chakra styles straight to the
 * custom internal components which are code-split into their own file.
 * See `./innerComponents.tsx`
 *
 * You can use the Chakra `variant` prop to declare a variant from the extended theme,
 * and use any valid props sent to the `Select` component.
 *
 * @see {@link https://react-select.com/props#select-props} for the list of valid props
 *
 * `WARNING`: the  `unstyled`, and `menuPlacement` props are locked and should not be altered, per Design System.
 */
const ReactSelect = <
  Option,
  Group extends GroupBase<Option> = GroupBase<Option>,
  IsMulti extends boolean = false
>({
  variant,
  ...rest
}: Omit<Props<Option, IsMulti, Group>, "unstyled" | "menuPlacement"> & {
  variant?: ThemingProps<"ReactSelect">["variant"]
}) => {
  const styles = useMultiStyleConfig("ReactSelect", {
    variant,
  })
  return (
    <ReactSelectStylesProvider value={styles}>
      <Select
        components={components}
        styles={{
          singleValue: (base) => ({
            ...base,
            // Force text overflow at smaller widths when inline with other select components
            position: "absolute",
          }),
        }}
        isSearchable={false}
        {...rest}
        unstyled
        menuPlacement="bottom"
      />
    </ReactSelectStylesProvider>
  )
}

export default ReactSelect
