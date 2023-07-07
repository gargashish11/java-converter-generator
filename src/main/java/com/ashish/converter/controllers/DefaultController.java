package com.ashish.converter.controllers;

import com.ashish.converter.pojo.ConverterInputData;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Arrays;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Controller
public class DefaultController {
    private final String newLine = System.getProperty("line.separator");

    @GetMapping("/")
    public String home(Model model) {
        var converterInputData = new ConverterInputData();
        model.addAttribute("converterInputData", converterInputData);
        return "index";
    }

    @PostMapping("/")
    public String generateConverter(Model model, ConverterInputData converterInputData) {
        String source = converterInputData.getSource();
        String target = converterInputData.getTarget();
        String[] sourceTarget = {source + ".get", target + ".set"};
        var output = Arrays.stream(converterInputData.getFields().split("((\\W))"))
                .map(String::strip)
                .filter(Predicate.not(StringUtils::isEmpty))
                .filter(Predicate.not(StringUtils::containsWhitespace))
                .filter(Predicate.not(s -> s.matches("private")))
                .filter(Predicate.not(s -> s.matches("[A-Z]\\w*")))
                .map(StringUtils::capitalize)
                .map(s -> StringUtils.join(sourceTarget[1],
                        s,
                        "(",
                        sourceTarget[0],
                        s,
                        "());"))
                .map(s -> s.concat(newLine))
                .toList();

        StringBuilder finalOutput = new StringBuilder(StringUtils.capitalize(target));
        finalOutput.append(" ")
                .append(target)
                .append("=")
                .append("new ")
                .append(StringUtils.capitalize(target))
                .append("();")
                .append(newLine)
                .append(output.stream().collect(Collectors.joining()))
                .append("return ")
                .append(target)
                .append(";");
        converterInputData.setOutput(finalOutput.toString());
        model.addAttribute("converterInputData", converterInputData);
        return "index";
    }

}
