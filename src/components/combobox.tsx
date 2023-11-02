import { Check, ChevronsUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { sampleBooks } from "@/utils/apis/books/sample-data";

import { cn } from "@/utils/utils";

interface ComboboxDatas {
  id: number;
  title: string;
}

interface ComboboxProps {
  placeholder?: string;
}

const tryBook = sampleBooks.map((book) => {
  return { id: +book.id, title: book.title };
});

const Combobox = ({ placeholder = "Search..." }: ComboboxProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [datas, setDatas] = React.useState<ComboboxDatas[]>([]);

  const getSuggestions = React.useCallback(async function (query: string) {
    if (!query) {
      return;
    }
    const filterData = tryBook.filter((book) =>
      book.title.toLowerCase().includes(query)
    );
    setDatas(filterData);
  }, []);

  const getSuggestionsDebounce = React.useMemo(
    () => debounce(getSuggestions, 1000),
    [getSuggestions]
  );

  function onInputChange(newValue: string) {
    getSuggestionsDebounce(newValue);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={placeholder}
            onValueChange={onInputChange}
          />
          <CommandEmpty>No book found.</CommandEmpty>
          <CommandGroup>
            {datas.map((data) => (
              <CommandItem
                key={data.title}
                value={data.title}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setDatas([]);
                  setOpen(false);
                  navigate(`/books/${data.id}`);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === data.title ? "opacity-100" : "opacity-0"
                  )}
                />
                {data.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
