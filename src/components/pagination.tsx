import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Meta } from "@/utils/types/api";
import { generatePagesToDisplay } from "@/utils/formatter";

interface Props {
  meta?: Meta;
  onClickPrevious: () => void;
  onClickNext: () => void;
  onClickPage: (page: string | number) => void;
}

const Pagination = (props: Props) => {
  const { meta, onClickPrevious, onClickNext, onClickPage } = props;

  const pagesToDisplay = useMemo(
    () => generatePagesToDisplay(meta?.currentPage!, meta?.totalPages!),
    [meta]
  );

  return (
    <div className="flex justify-center items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        disabled={meta?.currentPage === 1}
        onClick={onClickPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {meta &&
        pagesToDisplay.map((page, index) => {
          return (
            <Button
              variant="outline"
              size="icon"
              key={`${page}-${index}`}
              disabled={meta?.currentPage === page}
              onClick={() => onClickPage(page)}
            >
              {page}
            </Button>
          );
        })}
      <Button
        variant="outline"
        size="icon"
        disabled={meta?.currentPage === meta?.totalPages}
        onClick={onClickNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
