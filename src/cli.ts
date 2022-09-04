#!/usr/bin/env node
import "reflect-metadata";
import yargs from "yargs";
import register from "@babel/register";
import { getVersion } from "./version";
import MigrationCreateCommand from "./Commands/MigrationCreateCommand";
import EntityCreateCommand from "./Commands/EntityCreateCommand";
import MigrationShowCommand from "./Commands/MigrationShowCommand";
import MigrationRunCommand from "./Commands/MigrationRunCommand";
import MigrationUndoCommand from "./Commands/MigrationUndoCommand";
import MigrationResetCommand from "./Commands/MigrationResetCommand";
import RouteCreateCommand from "./Commands/RouteCreateCommand";
import ServiceCreateCommand from "./Commands/ServiceCreateCommand";
import JobCreateCommand from "./Commands/JobCreateCommand";
import EntityLoadCommand from "./Commands/EntityLoadCommand";
import SecretGenCommand from "./Commands/SecretGenCommand";
import ProjectCreateCommand from "./Commands/ProjectCreateCommand";

register({ extensions: [ ".ts", ".tsx", ".js", ".jsx" ] });

const yargsBase = yargs
  .usage("Usage: onebe <command> [options]")
  .scriptName("onebe")
  .version(getVersion())
  .command(new MigrationCreateCommand())
  .command(new MigrationShowCommand())
  .command(new MigrationRunCommand())
  .command(new MigrationResetCommand())
  .command(new MigrationUndoCommand())
  .command(new EntityCreateCommand())
  .command(new RouteCreateCommand())
  .command(new ServiceCreateCommand())
  .command(new JobCreateCommand())
  .command(new EntityLoadCommand())
  .command(new SecretGenCommand())
  .command(new ProjectCreateCommand());

yargsBase.recommendCommands().demandCommand(1).strict().alias("v", "version").help("h").alias("h", "help").argv;
